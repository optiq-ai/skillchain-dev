import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Konfiguracja klienta axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor do obsługi błędów
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Funkcje API dla ścieżek kariery
export const getCareerCategories = async () => {
  try {
    const response = await apiClient.get('/career-categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCareerPaths = async (categoryId = null) => {
  try {
    const url = categoryId ? `/career-paths?categoryId=${categoryId}` : '/career-paths';
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCareerPathDetails = async (id) => {
  try {
    const response = await apiClient.get(`/career-paths/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkcje API dla umiejętności
export const getSkills = async (filters = {}) => {
  try {
    const response = await apiClient.get('/skills', { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSkillDetails = async (id) => {
  try {
    const response = await apiClient.get(`/skills/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkcje API dla certyfikatów
export const getCertifications = async (filters = {}) => {
  try {
    const response = await apiClient.get('/certifications', { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCertificationDetails = async (id) => {
  try {
    const response = await apiClient.get(`/certifications/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkcje API dla ustawień
export const saveUserSettings = async (settings) => {
  try {
    const response = await apiClient.post('/settings', settings);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSettings = async () => {
  try {
    const response = await apiClient.get('/settings');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
