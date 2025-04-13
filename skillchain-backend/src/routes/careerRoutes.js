const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Pobieranie wszystkich kategorii ścieżek kariery
router.get('/categories', async (req, res) => {
  try {
    const { rows } = await req.db.query(`
      SELECT 
        cc.id, 
        cct.name, 
        cct.description 
      FROM 
        career_categories cc
      JOIN 
        career_category_translations cct ON cc.id = cct.category_id
      JOIN 
        languages l ON cct.language_id = l.id
      WHERE 
        l.code = $1
      ORDER BY 
        cct.name
    `, [req.query.lang || 'pl']);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching career categories:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania kategorii ścieżek kariery'
    });
  }
});

// Pobieranie wszystkich ścieżek kariery
router.get('/paths', async (req, res) => {
  try {
    const { categoryId } = req.query;
    const languageCode = req.query.lang || 'pl';
    
    let query = `
      SELECT 
        cp.id, 
        cp.category_id,
        cp.icon_path,
        cp.color_hex,
        cp.difficulty_level,
        cpt.title,
        cpt.description,
        cpt.requirements,
        cpt.job_outlook
      FROM 
        career_paths cp
      JOIN 
        career_path_translations cpt ON cp.id = cpt.career_path_id
      JOIN 
        languages l ON cpt.language_id = l.id
      WHERE 
        l.code = $1
    `;
    
    const queryParams = [languageCode];
    
    if (categoryId) {
      query += ` AND cp.category_id = $2`;
      queryParams.push(categoryId);
    }
    
    query += ` ORDER BY cpt.title`;
    
    const { rows } = await req.db.query(query, queryParams);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching career paths:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania ścieżek kariery'
    });
  }
});

// Pobieranie szczegółów ścieżki kariery
router.get('/paths/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const languageCode = req.query.lang || 'pl';
    
    // Pobieranie podstawowych informacji o ścieżce kariery
    const careerPathResult = await req.db.query(`
      SELECT 
        cp.id, 
        cp.category_id,
        cp.icon_path,
        cp.color_hex,
        cp.difficulty_level,
        cpt.title,
        cpt.description,
        cpt.requirements,
        cpt.job_outlook
      FROM 
        career_paths cp
      JOIN 
        career_path_translations cpt ON cp.id = cpt.career_path_id
      JOIN 
        languages l ON cpt.language_id = l.id
      WHERE 
        cp.id = $1 AND l.code = $2
    `, [id, languageCode]);
    
    if (careerPathResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ścieżka kariery nie została znaleziona'
      });
    }
    
    const careerPath = careerPathResult.rows[0];
    
    // Pobieranie stanowisk dla ścieżki kariery
    const positionsResult = await req.db.query(`
      SELECT 
        jp.id,
        jp.level,
        jp.salary_min,
        jp.salary_max,
        jp.years_experience_min,
        jp.years_experience_max,
        jpt.title,
        jpt.description,
        jpt.responsibilities
      FROM 
        job_positions jp
      JOIN 
        job_position_translations jpt ON jp.id = jpt.job_position_id
      JOIN 
        languages l ON jpt.language_id = l.id
      WHERE 
        jp.career_path_id = $1 AND l.code = $2
      ORDER BY 
        jp.level
    `, [id, languageCode]);
    
    // Pobieranie umiejętności dla stanowisk
    const skillsResult = await req.db.query(`
      SELECT 
        jps.job_position_id,
        jps.importance_level,
        s.id AS skill_id,
        s.skill_type,
        s.icon_path,
        st.name AS skill_name,
        st.description AS skill_description
      FROM 
        job_position_skills jps
      JOIN 
        skills s ON jps.skill_id = s.id
      JOIN 
        skill_translations st ON s.id = st.skill_id
      JOIN 
        languages l ON st.language_id = l.id
      JOIN 
        job_positions jp ON jps.job_position_id = jp.id
      WHERE 
        jp.career_path_id = $1 AND l.code = $2
    `, [id, languageCode]);
    
    // Pobieranie kursów i certyfikatów dla ścieżki kariery
    const certificationsResult = await req.db.query(`
      SELECT 
        cc.id,
        cc.provider,
        cc.url,
        cc.is_certification,
        cc.difficulty_level,
        cc.duration_hours,
        cct.title,
        cct.description,
        cct.learning_outcomes
      FROM 
        courses_certifications cc
      JOIN 
        course_certification_translations cct ON cc.id = cct.course_certification_id
      JOIN 
        languages l ON cct.language_id = l.id
      WHERE 
        cc.career_path_id = $1 AND l.code = $2
    `, [id, languageCode]);
    
    // Grupowanie umiejętności według stanowisk
    const positionsWithSkills = positionsResult.rows.map(position => {
      const positionSkills = skillsResult.rows
        .filter(skill => skill.job_position_id === position.id)
        .map(skill => ({
          id: skill.skill_id,
          name: skill.skill_name,
          description: skill.skill_description,
          type: skill.skill_type,
          iconPath: skill.icon_path,
          importanceLevel: skill.importance_level
        }));
      
      return {
        ...position,
        skills: positionSkills
      };
    });
    
    // Tworzenie kompletnego obiektu ścieżki kariery
    const completeCareerPath = {
      ...careerPath,
      positions: positionsWithSkills,
      certifications: certificationsResult.rows
    };
    
    res.json({
      success: true,
      data: completeCareerPath
    });
  } catch (err) {
    console.error('Error fetching career path details:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania szczegółów ścieżki kariery'
    });
  }
});

// Dodawanie nowej ścieżki kariery (tylko dla przykładu, wymaga autentykacji)
router.post('/paths', [
  body('categoryId').isInt().withMessage('Kategoria musi być liczbą całkowitą'),
  body('title').isString().notEmpty().withMessage('Tytuł jest wymagany'),
  body('description').isString().notEmpty().withMessage('Opis jest wymagany'),
  body('difficultyLevel').isInt({ min: 1, max: 5 }).withMessage('Poziom trudności musi być liczbą od 1 do 5')
], async (req, res) => {
  // Walidacja danych wejściowych
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  
  // Implementacja dodawania nowej ścieżki kariery
  // (w rzeczywistej aplikacji)
  
  res.status(201).json({
    success: true,
    message: 'Ścieżka kariery została dodana',
    data: { id: 999 } // Przykładowe ID
  });
});

module.exports = router;
