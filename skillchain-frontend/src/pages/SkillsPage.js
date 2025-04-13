import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import './SkillsPage.css';

const SkillsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Przykładowe dane umiejętności
  const skillCategories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'technical', name: 'Techniczne' },
    { id: 'soft', name: 'Miękkie' },
    { id: 'certification', name: 'Certyfikaty' }
  ];

  const skills = [
    {
      id: 1,
      name: 'JavaScript',
      category: 'technical',
      description: 'Język programowania używany do tworzenia interaktywnych stron internetowych.',
      relatedPaths: ['Frontend Developer', 'Full Stack Developer', 'JavaScript Developer'],
      difficulty: 3
    },
    {
      id: 2,
      name: 'Python',
      category: 'technical',
      description: 'Wszechstronny język programowania używany w analizie danych, AI, automatyzacji i rozwoju aplikacji.',
      relatedPaths: ['Data Scientist', 'Backend Developer', 'DevOps Engineer'],
      difficulty: 2
    },
    {
      id: 3,
      name: 'SQL',
      category: 'technical',
      description: 'Język zapytań używany do zarządzania i manipulowania danymi w relacyjnych bazach danych.',
      relatedPaths: ['Database Administrator', 'Data Analyst', 'Backend Developer'],
      difficulty: 3
    },
    {
      id: 4,
      name: 'Zarządzanie projektami',
      category: 'soft',
      description: 'Umiejętność planowania, organizowania i nadzorowania projektów od początku do końca.',
      relatedPaths: ['Project Manager', 'Product Owner', 'Scrum Master'],
      difficulty: 4
    },
    {
      id: 5,
      name: 'Komunikacja',
      category: 'soft',
      description: 'Umiejętność jasnego i efektywnego przekazywania informacji zarówno ustnie, jak i pisemnie.',
      relatedPaths: ['Team Leader', 'Project Manager', 'Business Analyst'],
      difficulty: 3
    },
    {
      id: 6,
      name: 'AWS Certified Solutions Architect',
      category: 'certification',
      description: 'Certyfikat potwierdzający umiejętności projektowania i wdrażania systemów na platformie AWS.',
      relatedPaths: ['Cloud Architect', 'DevOps Engineer', 'Solutions Architect'],
      difficulty: 4
    }
  ];

  // Filtrowanie umiejętności
  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = searchTerm 
      ? skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="skills-page">
      <Container>
        <h1 className="page-title">{t('navigation.skills')}</h1>
        
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
          {skillCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
              className="category-filter-btn me-2 mb-2"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Lista umiejętności */}
        <Row>
          {filteredSkills.length > 0 ? (
            filteredSkills.map(skill => (
              <Col key={skill.id} md={6} lg={4} className="mb-4">
                <Card className="skill-card h-100">
                  <Card.Body>
                    <Card.Title>{skill.name}</Card.Title>
                    <div className="skill-category mb-3">
                      <span className={`category-badge ${skill.category}`}>
                        {skillCategories.find(cat => cat.id === skill.category)?.name}
                      </span>
                    </div>
                    
                    <div className="difficulty-indicator mb-3">
                      <small>{t('common.experienceLevel')}:</small>
                      <div className="difficulty-bars">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`difficulty-bar ${i < skill.difficulty ? 'active' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Card.Text>{skill.description}</Card.Text>
                    
                    <div className="related-paths mt-3">
                      <h6>{t('skill.requiredFor')}</h6>
                      <ListGroup variant="flush">
                        {skill.relatedPaths.map((path, index) => (
                          <ListGroup.Item key={index} className="related-path-item">
                            {path}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
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

export default SkillsPage;
