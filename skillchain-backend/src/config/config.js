require('dotenv').config();

module.exports = {
  // Konfiguracja bazy danych
  database: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'skillchain',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  
  // Konfiguracja serwera
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
  },
  
  // Konfiguracja JWT (dla przyszłej implementacji uwierzytelniania)
  jwt: {
    secret: process.env.JWT_SECRET || 'skillchain-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  
  // Konfiguracja CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  
  // Domyślny język
  defaultLanguage: 'pl',
  
  // Obsługiwane języki
  supportedLanguages: ['pl', 'en', 'de', 'uk'],
};
