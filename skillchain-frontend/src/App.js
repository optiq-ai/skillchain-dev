import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './i18n/i18n';

// Importowanie komponentów
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CareerPathsPage from './pages/CareerPathsPage';
import CareerPathDetailsPage from './pages/CareerPathDetailsPage';
import SkillsPage from './pages/SkillsPage';
import CertificationsPage from './pages/CertificationsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Sidebar />
          <main className="main-content">
            <Container fluid>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/career-paths" element={<CareerPathsPage />} />
                <Route path="/career-paths/:id" element={<CareerPathDetailsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
