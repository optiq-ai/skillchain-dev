require('dotenv').config();
const { Pool } = require('pg');
const config = require('./config');

// Utworzenie puli połączeń z bazą danych
const pool = new Pool(config.database);

// Funkcja testująca połączenie z bazą danych
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Połączenie z bazą danych PostgreSQL zostało ustanowione pomyślnie');
    client.release();
    return true;
  } catch (err) {
    console.error('Błąd podczas łączenia z bazą danych PostgreSQL:', err);
    return false;
  }
};

// Funkcja wykonująca zapytanie do bazy danych
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('Błąd podczas wykonywania zapytania:', err);
    throw err;
  }
};

// Funkcja zamykająca połączenie z bazą danych
const close = async () => {
  try {
    await pool.end();
    console.log('Połączenie z bazą danych PostgreSQL zostało zamknięte');
  } catch (err) {
    console.error('Błąd podczas zamykania połączenia z bazą danych:', err);
  }
};

module.exports = {
  query,
  testConnection,
  close,
  pool
};
