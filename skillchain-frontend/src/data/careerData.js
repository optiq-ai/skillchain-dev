import networkPath from './network_career_path.md';
import programmingPath from './programming_career_path.md';
import databasePath from './database_career_path.md';
import projectManagementPath from './project_management_career_path.md';
import cybersecurityPath from './cybersecurity_career_path.md';
import devopsPath from './devops_career_path.md';
import aiMlPath from './ai_ml_career_path.md';
import financeCareerData from './financeCareerData';
import marketingCareerData from './marketingCareerData';
import hrCareerData from './hrCareerData';
import educationCareerData from './educationCareerData';

const careerPaths = [
  {
    id: 'network',
    title: 'Sieci komputerowe',
    description: 'Ścieżka kariery w dziedzinie sieci komputerowych, obejmująca role od administratora sieci po architekta sieci.',
    path: networkPath,
    icon: 'network-wired',
    color: '#3498db'
  },
  {
    id: 'programming',
    title: 'Programowanie',
    description: 'Ścieżka kariery w dziedzinie programowania, obejmująca role frontend, backend i fullstack developera.',
    path: programmingPath,
    icon: 'code',
    color: '#2ecc71'
  },
  {
    id: 'database',
    title: 'Bazy danych',
    description: 'Ścieżka kariery w dziedzinie baz danych, obejmująca role od administratora baz danych po architekta danych.',
    path: databasePath,
    icon: 'database',
    color: '#e74c3c'
  },
  {
    id: 'project-management',
    title: 'Zarządzanie projektami IT',
    description: 'Ścieżka kariery w dziedzinie zarządzania projektami IT, obejmująca role od koordynatora projektu po dyrektora PMO.',
    path: projectManagementPath,
    icon: 'tasks',
    color: '#9b59b6'
  },
  {
    id: 'cybersecurity',
    title: 'Cyberbezpieczeństwo',
    description: 'Ścieżka kariery w dziedzinie cyberbezpieczeństwa, obejmująca role od analityka bezpieczeństwa po CISO.',
    path: cybersecurityPath,
    icon: 'shield-alt',
    color: '#f39c12'
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Ścieżka kariery w dziedzinie DevOps, obejmująca role od inżyniera DevOps po architekta DevOps.',
    path: devopsPath,
    icon: 'sync-alt',
    color: '#1abc9c'
  },
  {
    id: 'ai-ml',
    title: 'Sztuczna inteligencja i uczenie maszynowe',
    description: 'Ścieżka kariery w dziedzinie AI i ML, obejmująca role od data scientist po research scientist.',
    path: aiMlPath,
    icon: 'brain',
    color: '#d35400'
  },
  {
    id: 'finance',
    title: 'Finanse',
    description: 'Ścieżka kariery w branży finansowej, od poziomu początkującego do C-level, obejmująca różne specjalizacje.',
    path: null,
    icon: 'money-bill-wave',
    color: '#2E7D32',
    data: financeCareerData
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Ścieżka kariery w branży marketingowej, od asystenta marketingu po dyrektora marketingu (CMO).',
    path: null,
    icon: 'bullhorn',
    color: '#E91E63',
    data: marketingCareerData
  },
  {
    id: 'hr',
    title: 'Zasoby Ludzkie (HR)',
    description: 'Ścieżka kariery w dziedzinie zarządzania zasobami ludzkimi, od asystenta HR po dyrektora personalnego (CHRO).',
    path: null,
    icon: 'users',
    color: '#8E44AD',
    data: hrCareerData
  },
  {
    id: 'education',
    title: 'Edukacja',
    description: 'Ścieżka kariery w sektorze edukacji, od nauczyciela po dyrektora placówki edukacyjnej.',
    path: null,
    icon: 'graduation-cap',
    color: '#FF5722',
    data: educationCareerData
  }
];

export default careerPaths;
