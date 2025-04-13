require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Pool } = require('pg');

// Importowanie tras
const careerRoutes = require('./routes/careerRoutes');
const skillRoutes = require('./routes/skillRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Konfiguracja połączenia z bazą danych
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'skillchain',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Inicjalizacja aplikacji Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Zabezpieczenia HTTP
app.use(cors()); // Obsługa CORS
app.use(express.json()); // Parsowanie JSON
app.use(morgan('dev')); // Logowanie żądań HTTP

// Udostępnianie połączenia z bazą danych dla tras
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// Trasy API
app.use('/api/career', careerRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/settings', settingsRoutes);

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Wystąpił błąd serwera',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Trasa domyślna
app.get('/', (req, res) => {
  res.json({
    message: 'SkillChain API',
    version: '1.0.0',
    status: 'running'
  });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;
