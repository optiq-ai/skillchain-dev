import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import './CareerPathsPage.css';

const CareerPathsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Przykładowe dane ścieżek kariery
  const careerCategories = [
    { id: 'networking', icon: '🌐', color: '#4285F4' },
    { id: 'programming', icon: '💻', color: '#34A853' },
    { id: 'databases', icon: '🗄️', color: '#FBBC05' },
    { id: 'projectManagement', icon: '📊', color: '#EA4335' },
    { id: 'cybersecurity', icon: '🔒', color: '#8E44AD' },
    { id: 'devops', icon: '⚙️', color: '#F39C12' },
    { id: 'aiMl', icon: '🧠', color: '#1ABC9C' }
  ];
  
  const careerPaths = [
    {
      id: 1,
      category: 'networking',
      icon: '🌐',
      color: '#4285F4',
      difficulty: 3,
      positions: ['Network Administrator', 'Network Engineer', 'Network Architect'],
    },
    {
      id: 2,
      category: 'programming',
      icon: '💻',
      color: '#34A853',
      difficulty: 4,
      positions: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'],
    },
    {
      id: 3,
      category: 'databases',
      icon: '🗄️',
      color: '#FBBC05',
      difficulty: 3,
      positions: ['Database Administrator', 'Database Developer', 'Data Architect'],
    },
    {
      id: 4,
      category: 'projectManagement',
      icon: '📊',
      color: '#EA4335',
      difficulty: 2,
      positions: ['Project Manager', 'Scrum Master', 'Product Owner'],
    },
    {
      id: 5,
      category: 'cybersecurity',
      icon: '🔒',
      color: '#8E44AD',
      difficulty: 4,
      positions: ['Security Analyst', 'Penetration Tester', 'Security Architect'],
    },
    {
      id: 6,
      category: 'devops',
      icon: '⚙️',
      color: '#F39C12',
      difficulty: 4,
      positions: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer'],
    },
    {
      id: 7,
      category: 'aiMl',
      icon: '🧠',
      color: '#1ABC9C',
      difficulty: 5,
      positions: ['Data Scientist', 'Machine Learning Engineer', 'AI Researcher'],
    }
  ];

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
    const matchesCategory = activeCategory ? path.category === activeCategory : true;
    const matchesSearch = searchTerm 
      ? t(`careerCategories.${path.category}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.positions.some(pos => pos.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

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
              <span className="category-icon-small">{category.icon}</span>
              {t(`careerCategories.${category.id}`)}
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
                      {path.icon}
                    </div>
                    <Card.Title>{t(`careerCategories.${path.category}`)}</Card.Title>
                    
                    <div className="difficulty-indicator mb-3">
                      <small>{t('common.experienceLevel')}:</small>
                      <div className="difficulty-bars">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`difficulty-bar ${i < path.difficulty ? 'active' : ''}`}
                            style={{ backgroundColor: i < path.difficulty ? path.color : 'var(--border-color)' }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="positions-list mb-3">
                      {path.positions.map((position, index) => (
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
