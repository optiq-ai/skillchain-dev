const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Pobieranie ustawień użytkownika
router.get('/', async (req, res) => {
  try {
    // W rzeczywistej aplikacji tutaj byłaby logika pobierania ustawień konkretnego użytkownika
    // na podstawie tokenu uwierzytelniającego
    
    // Przykładowe ustawienia
    const settings = {
      language: 'pl',
      theme: 'light',
      notifications: true
    };
    
    res.json({
      success: true,
      data: settings
    });
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania ustawień'
    });
  }
});

// Zapisywanie ustawień użytkownika
router.post('/', [
  body('language').isString().isIn(['pl', 'en', 'de', 'uk']).withMessage('Nieprawidłowy język'),
  body('theme').isString().isIn(['light', 'dark', 'system']).withMessage('Nieprawidłowy motyw'),
  body('notifications').isBoolean().withMessage('Wartość powiadomień musi być typu boolean')
], async (req, res) => {
  // Walidacja danych wejściowych
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  
  try {
    const { language, theme, notifications } = req.body;
    
    // W rzeczywistej aplikacji tutaj byłaby logika zapisywania ustawień konkretnego użytkownika
    // na podstawie tokenu uwierzytelniającego
    
    // Przykładowa odpowiedź
    res.json({
      success: true,
      message: 'Ustawienia zostały zapisane',
      data: { language, theme, notifications }
    });
  } catch (err) {
    console.error('Error saving settings:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas zapisywania ustawień'
    });
  }
});

// Pobieranie dostępnych języków
router.get('/languages', async (req, res) => {
  try {
    const { rows } = await req.db.query(`
      SELECT 
        id, 
        code, 
        name,
        is_active
      FROM 
        languages
      WHERE
        is_active = true
      ORDER BY 
        name
    `);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching languages:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania języków'
    });
  }
});

// Pobieranie informacji o aplikacji
router.get('/app-info', async (req, res) => {
  try {
    const appInfo = {
      name: 'SkillChain',
      version: '1.0.0',
      description: 'Aplikacja do zarządzania ścieżkami kariery w IT',
      authors: ['Zespół SkillChain'],
      contact: 'contact@skillchain.example.com'
    };
    
    res.json({
      success: true,
      data: appInfo
    });
  } catch (err) {
    console.error('Error fetching app info:', err);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania informacji o aplikacji'
    });
  }
});

module.exports = router;
