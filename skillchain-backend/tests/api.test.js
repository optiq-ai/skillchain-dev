const request = require('supertest');
const app = require('../src/server');

// Mock the database connection
jest.mock('../src/config/db', () => ({
  query: jest.fn(),
  testConnection: jest.fn().mockResolvedValue(true),
  close: jest.fn()
}));

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return API info', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('version');
      expect(res.body).toHaveProperty('status');
    });
  });

  describe('Career Routes', () => {
    beforeEach(() => {
      const db = require('../src/config/db');
      
      // Mock for categories
      db.query.mockImplementation((query, params) => {
        if (query.includes('career_categories')) {
          return Promise.resolve({
            rows: [
              { id: 1, name: 'Sieci komputerowe', description: 'Opis sieci' },
              { id: 2, name: 'Programowanie', description: 'Opis programowania' }
            ]
          });
        }
        
        // Mock for career paths
        if (query.includes('career_paths') && !query.includes('career_path_id')) {
          return Promise.resolve({
            rows: [
              { 
                id: 1, 
                category_id: 1, 
                title: 'Inżynier sieci', 
                description: 'Opis ścieżki',
                difficulty_level: 4
              }
            ]
          });
        }
        
        return Promise.resolve({ rows: [] });
      });
    });

    it('should get career categories', async () => {
      const res = await request(app).get('/api/career/categories');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should get career paths', async () => {
      const res = await request(app).get('/api/career/paths');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Settings Routes', () => {
    beforeEach(() => {
      const db = require('../src/config/db');
      
      // Mock for languages
      db.query.mockImplementation((query, params) => {
        if (query.includes('languages')) {
          return Promise.resolve({
            rows: [
              { id: 1, code: 'pl', name: 'Polski', is_active: true },
              { id: 2, code: 'en', name: 'English', is_active: true }
            ]
          });
        }
        
        return Promise.resolve({ rows: [] });
      });
    });

    it('should get available languages', async () => {
      const res = await request(app).get('/api/settings/languages');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should get app info', async () => {
      const res = await request(app).get('/api/settings/app-info');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('version');
    });
  });
});
