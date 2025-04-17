import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import './CareerPathsPage.css';
import careerPaths from '../data/careerData';

const CareerPathsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generowanie kategorii na podstawie zaimportowanych ścieżek kariery
  const careerCategories = careerPaths.map(path => ({
    id: path.id,
    icon: path.icon,
    color: path.color
  }));

  useEffect(() => {
    // Pobierz kategorię z parametrów URL
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [location]);

  // Filtrowanie ścieżek kariery
  const filteredPaths = careerPaths.filter(path => {
    const matchesCategory = activeCategory ? path.id === activeCategory : true;
    const matchesSearch = searchTerm 
      ? path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Funkcja do określania poziomu trudności na podstawie ścieżki kariery
  const getDifficulty = (path) => {
    // Domyślnie zwracamy 3 (średni poziom trudności)
    return 3;
  };

  // Funkcja do pobierania pozycji z ścieżki kariery
  const getPositions = (path) => {
    // Jeśli ścieżka ma dane w nowym formacie (finanse)
    if (path.data && path.data.levels) {
      // Pobierz pozycje z pierwszych trzech poziomów
      const positions = [];
      for (let i = 0; i < Math.min(3, path.data.levels.length); i++) {
        if (path.data.levels[i].positions && path.data.levels[i].positions.length > 0) {
          positions.push(path.data.levels[i].positions[0]);
        }
      }
      return positions;
    }
    
    // Dla starych ścieżek kariery, zwracamy domyślne pozycje
    switch(path.id) {
      case 'network':
        return ['Network Administrator', 'Network Engineer', 'Network Architect'];
      case 'programming':
        return ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'];
      case 'database':
        return ['Database Administrator', 'Database Developer', 'Data Architect'];
      case 'project-management':
        return ['Project Manager', 'Scrum Master', 'Product Owner'];
      case 'cybersecurity':
        return ['Security Analyst', 'Penetration Tester', 'Security Architect'];
      case 'devops':
        return ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer'];
      case 'ai-ml':
        return ['Data Scientist', 'Machine Learning Engineer', 'AI Researcher'];
      default:
        return ['Junior Specialist', 'Senior Specialist', 'Manager'];
    }
  };

  // Funkcja renderująca ikonę
  const renderIcon = (iconName) => {
    // Prosta funkcja renderująca emoji zamiast FontAwesome
    switch(iconName) {
      case 'network-wired': return '🌐';
      case 'code': return '💻';
      case 'database': return '🗄️';
      case 'tasks': return '📊';
      case 'shield-alt': return '🔒';
      case 'sync-alt': return '⚙️';
      case 'brain': return '🧠';
      case 'money-bill-wave': return '💰';
      default: return '📌';
    }
  };

  return (
    <div className="career-paths-page">
      <Container>
        <h1 className="page-title">{t('navigation.careerPaths')}</h1>
        
        {/* Wyszukiwarka */}
        <Form className="search-form mb-4">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Form>
        
        {/* Filtry kategorii */}
        <div className="category-filters mb-4">
          <Button
            variant={activeCategory === '' ? 'primary' : 'outline-primary'}
            className="category-filter-btn me-2 mb-2"
            onClick={() => setActiveCategory('')}
          >
            Wszystkie
          </Button>
          
          {careerCategories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
              className="category-filter-btn me-2 mb-2"
              onClick={() => setActiveCategory(category.id)}
              style={{ borderColor: category.color, color: activeCategory === category.id ? 'white' : category.color }}
            >
              <span className="me-2">{renderIcon(category.icon)}</span>
              {careerPaths.find(path => path.id === category.id)?.title || category.id}
            </Button>
          ))}
        </div>
        
        {/* Lista ścieżek kariery */}
        <Row>
          {filteredPaths.length > 0 ? (
            filteredPaths.map(path => (
              <Col key={path.id} md={6} lg={4} className="mb-4">
                <Card className="career-path-card">
                  <Card.Body>
                    <div 
                      className="path-icon"
                      style={{ backgroundColor: path.color }}
                    >
                      {renderIcon(path.icon)}
                    </div>
                    <Card.Title>{path.title}</Card.Title>
                    
                    <div className="difficulty-indicator mb-3">
                      <small>{t('common.experienceLevel')}:</small>
                      <div className="difficulty-bars">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`difficulty-bar ${i < getDifficulty(path) ? 'active' : ''}`}
                            style={{ backgroundColor: i < getDifficulty(path) ? path.color : 'var(--border-color)' }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="positions-list mb-3">
                      {getPositions(path).map((position, index) => (
                        <Badge 
                          key={index} 
                          bg="light" 
                          text="dark"
                          className="position-badge me-2 mb-2"
                        >
                          {position}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      as={Link}
                      to={`/career-paths/${path.id}`}
                      variant="outline-primary"
                      className="mt-2"
                      style={{ borderColor: path.color, color: path.color }}
                    >
                      {t('common.viewDetails')}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center py-5">
              <p className="text-muted">{t('common.noResults')}</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CareerPathsPage;
