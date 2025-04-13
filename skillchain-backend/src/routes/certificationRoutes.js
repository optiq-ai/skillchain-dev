const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Pobieranie wszystkich certyfikatów
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const languageCode = req.query.lang || 'pl';
    
    let query = `
      SELECT 
        cc.id, 
        cc.provider,
        cc.url,
        cc.is_certification,
        cc.difficulty_level,
        cc.duration_hours,
        cc.career_path_id,
        cct.title,
        cct.description,
        cct.learning_outcomes,
        cpt.title AS career_path_title
      FROM 
        courses_certifications cc
      JOIN 
        course_certification_translations cct ON cc.id = cct.course_certification_id
      JOIN 
        languages l ON cct.language_id = l.id
      LEFT JOIN
        career_paths cp ON cc.career_path_id = cp.id
      LEFT JOIN
        career_path_translations cpt ON cp.id = cpt.career_path_id AND cpt.language_id = l.id
      WHERE 
        l.code = $1
    `;
    
    const queryParams = [languageCode];
    let paramIndex = 2;
    
    if (category) {
      query += ` AND cp.category_id = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }
    
    if (difficulty) {
      query += ` AND cc.difficulty_level = $${paramIndex}`;
      queryParams.push(difficulty);
      paramIndex++;
    }
    
    if (search) {
      query += ` AND (cct.title ILIKE $${paramIndex} OR cct.description ILIKE $${paramIndex} OR cc.provider ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }
    
    query += ` ORDER BY cct.title`;
    
    const { rows } = await req.db.query(query, queryParams);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching certifications:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania certyfikatów'
    });
  }
});

// Pobieranie szczegółów certyfikatu
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const languageCode = req.query.lang || 'pl';
    
    // Pobieranie podstawowych informacji o certyfikacie
    const certificationResult = await req.db.query(`
      SELECT 
        cc.id, 
        cc.provider,
        cc.url,
        cc.is_certification,
        cc.difficulty_level,
        cc.duration_hours,
        cc.career_path_id,
        cct.title,
        cct.description,
        cct.learning_outcomes,
        cp.id AS career_path_id,
        cpt.title AS career_path_title
      FROM 
        courses_certifications cc
      JOIN 
        course_certification_translations cct ON cc.id = cct.course_certification_id
      JOIN 
        languages l ON cct.language_id = l.id
      LEFT JOIN
        career_paths cp ON cc.career_path_id = cp.id
      LEFT JOIN
        career_path_translations cpt ON cp.id = cpt.career_path_id AND cpt.language_id = l.id
      WHERE 
        cc.id = $1 AND l.code = $2
    `, [id, languageCode]);
    
    if (certificationResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certyfikat nie został znaleziony'
      });
    }
    
    const certification = certificationResult.rows[0];
    
    // Pobieranie powiązanych umiejętności
    const skillsResult = await req.db.query(`
      SELECT 
        s.id,
        s.skill_type,
        s.icon_path,
        st.name,
        st.description
      FROM 
        skills s
      JOIN 
        job_position_skills jps ON s.id = jps.skill_id
      JOIN 
        job_positions jp ON jps.job_position_id = jp.id
      JOIN 
        skill_translations st ON s.id = st.skill_id
      JOIN 
        languages l ON st.language_id = l.id
      WHERE 
        jp.career_path_id = $1 AND l.code = $2
      GROUP BY
        s.id, st.name, st.description
      ORDER BY 
        st.name
    `, [certification.career_path_id, languageCode]);
    
    // Pobieranie powiązanych zasobów edukacyjnych
    const resourcesResult = await req.db.query(`
      SELECT 
        lr.id,
        lr.resource_type,
        lr.url,
        lrt.title,
        lrt.description,
        lrt.author
      FROM 
        learning_resources lr
      JOIN 
        learning_resource_translations lrt ON lr.id = lrt.resource_id
      JOIN 
        languages l ON lrt.language_id = l.id
      WHERE 
        lr.career_path_id = $1 AND l.code = $2
    `, [certification.career_path_id, languageCode]);
    
    // Tworzenie kompletnego obiektu certyfikatu
    const completeCertification = {
      ...certification,
      skills: skillsResult.rows,
      resources: resourcesResult.rows
    };
    
    res.json({
      success: true,
      data: completeCertification
    });
  } catch (err) {
    console.error('Error fetching certification details:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania szczegółów certyfikatu'
    });
  }
});

// Dodawanie nowego certyfikatu (tylko dla przykładu, wymaga autentykacji)
router.post('/', [
  body('title').isString().notEmpty().withMessage('Tytuł jest wymagany'),
  body('provider').isString().notEmpty().withMessage('Dostawca jest wymagany'),
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
  
  // Implementacja dodawania nowego certyfikatu
  // (w rzeczywistej aplikacji)
  
  res.status(201).json({
    success: true,
    message: 'Certyfikat został dodany',
    data: { id: 999 } // Przykładowe ID
  });
});

module.exports = router;
