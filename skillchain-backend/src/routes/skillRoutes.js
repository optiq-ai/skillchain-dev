const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Pobieranie wszystkich umiejętności
router.get('/', async (req, res) => {
  try {
    const { skillType, search } = req.query;
    const languageCode = req.query.lang || 'pl';
    
    let query = `
      SELECT 
        s.id, 
        s.skill_type,
        s.icon_path,
        st.name,
        st.description
      FROM 
        skills s
      JOIN 
        skill_translations st ON s.id = st.skill_id
      JOIN 
        languages l ON st.language_id = l.id
      WHERE 
        l.code = $1
    `;
    
    const queryParams = [languageCode];
    let paramIndex = 2;
    
    if (skillType) {
      query += ` AND s.skill_type = $${paramIndex}`;
      queryParams.push(skillType);
      paramIndex++;
    }
    
    if (search) {
      query += ` AND (st.name ILIKE $${paramIndex} OR st.description ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }
    
    query += ` ORDER BY st.name`;
    
    const { rows } = await req.db.query(query, queryParams);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania umiejętności'
    });
  }
});

// Pobieranie szczegółów umiejętności
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const languageCode = req.query.lang || 'pl';
    
    // Pobieranie podstawowych informacji o umiejętności
    const skillResult = await req.db.query(`
      SELECT 
        s.id, 
        s.skill_type,
        s.icon_path,
        st.name,
        st.description
      FROM 
        skills s
      JOIN 
        skill_translations st ON s.id = st.skill_id
      JOIN 
        languages l ON st.language_id = l.id
      WHERE 
        s.id = $1 AND l.code = $2
    `, [id, languageCode]);
    
    if (skillResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Umiejętność nie została znaleziona'
      });
    }
    
    const skill = skillResult.rows[0];
    
    // Pobieranie powiązanych stanowisk
    const positionsResult = await req.db.query(`
      SELECT 
        jp.id,
        jpt.title AS position_title,
        cp.id AS career_path_id,
        cpt.title AS career_path_title,
        jps.importance_level
      FROM 
        job_position_skills jps
      JOIN 
        job_positions jp ON jps.job_position_id = jp.id
      JOIN 
        job_position_translations jpt ON jp.id = jpt.job_position_id
      JOIN 
        career_paths cp ON jp.career_path_id = cp.id
      JOIN 
        career_path_translations cpt ON cp.id = cpt.career_path_id
      JOIN 
        languages l ON jpt.language_id = l.id AND cpt.language_id = l.id
      WHERE 
        jps.skill_id = $1 AND l.code = $2
      ORDER BY 
        jps.importance_level DESC, cpt.title, jpt.title
    `, [id, languageCode]);
    
    // Pobieranie zasobów edukacyjnych
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
        lr.skill_id = $1 AND l.code = $2
    `, [id, languageCode]);
    
    // Pobieranie powiązanych umiejętności
    const relatedSkillsResult = await req.db.query(`
      SELECT DISTINCT
        s2.id,
        s2.skill_type,
        s2.icon_path,
        st2.name,
        st2.description
      FROM 
        job_position_skills jps1
      JOIN 
        job_position_skills jps2 ON jps1.job_position_id = jps2.job_position_id AND jps1.skill_id != jps2.skill_id
      JOIN 
        skills s2 ON jps2.skill_id = s2.id
      JOIN 
        skill_translations st2 ON s2.id = st2.skill_id
      JOIN 
        languages l ON st2.language_id = l.id
      WHERE 
        jps1.skill_id = $1 AND l.code = $2
      LIMIT 5
    `, [id, languageCode]);
    
    // Tworzenie kompletnego obiektu umiejętności
    const completeSkill = {
      ...skill,
      positions: positionsResult.rows,
      resources: resourcesResult.rows,
      relatedSkills: relatedSkillsResult.rows
    };
    
    res.json({
      success: true,
      data: completeSkill
    });
  } catch (err) {
    console.error('Error fetching skill details:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania szczegółów umiejętności'
    });
  }
});

// Dodawanie nowej umiejętności (tylko dla przykładu, wymaga autentykacji)
router.post('/', [
  body('name').isString().notEmpty().withMessage('Nazwa jest wymagana'),
  body('description').isString().notEmpty().withMessage('Opis jest wymagany'),
  body('skillType').isString().notEmpty().withMessage('Typ umiejętności jest wymagany')
], async (req, res) => {
  // Walidacja danych wejściowych
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  
  // Implementacja dodawania nowej umiejętności
  // (w rzeczywistej aplikacji)
  
  res.status(201).json({
    success: true,
    message: 'Umiejętność została dodana',
    data: { id: 999 } // Przykładowe ID
  });
});

module.exports = router;
