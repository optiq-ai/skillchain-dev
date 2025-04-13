import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import './CertificationsPage.css';

const CertificationsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Przykładowe dane certyfikatów
  const certificationCategories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'networking', name: 'Sieci' },
    { id: 'programming', name: 'Programowanie' },
    { id: 'security', name: 'Bezpieczeństwo' },
    { id: 'cloud', name: 'Chmura' },
    { id: 'database', name: 'Bazy danych' }
  ];

  const difficultyLevels = [
    { id: 'all', name: 'Wszystkie poziomy' },
    { id: 'beginner', name: 'Początkujący' },
    { id: 'intermediate', name: 'Średniozaawansowany' },
    { id: 'advanced', name: 'Zaawansowany' }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Cisco Certified Network Associate (CCNA)',
      category: 'networking',
      provider: 'Cisco',
      difficulty: 'intermediate',
      description: 'Certyfikat potwierdzający umiejętności w zakresie instalacji, konfiguracji, obsługi i rozwiązywania problemów z sieciami średniej wielkości.',
      examCost: '299 USD',
      validityPeriod: '3 lata',
      prerequisites: 'Brak formalnych wymagań wstępnych'
    },
    {
      id: 2,
      name: 'AWS Certified Solutions Architect - Associate',
      category: 'cloud',
      provider: 'Amazon Web Services',
      difficulty: 'intermediate',
      description: 'Certyfikat potwierdzający umiejętności projektowania i wdrażania systemów rozproszonych na platformie AWS.',
      examCost: '150 USD',
      validityPeriod: '3 lata',
      prerequisites: 'Zalecane minimum 1 rok doświadczenia z AWS'
    },
    {
      id: 3,
      name: 'Microsoft Certified: Azure Administrator Associate',
      category: 'cloud',
      provider: 'Microsoft',
      difficulty: 'intermediate',
      description: 'Certyfikat potwierdzający umiejętności wdrażania, zarządzania i monitorowania tożsamości, zarządzania, magazynowania i sieci w chmurze Azure.',
      examCost: '165 USD',
      validityPeriod: '2 lata',
      prerequisites: 'Zalecane minimum 6 miesięcy doświadczenia z Azure'
    },
    {
      id: 4,
      name: 'CompTIA Security+',
      category: 'security',
      provider: 'CompTIA',
      difficulty: 'beginner',
      description: 'Certyfikat potwierdzający podstawowe umiejętności w zakresie bezpieczeństwa IT, w tym zabezpieczania sieci, zarządzania zagrożeniami i kryptografii.',
      examCost: '370 USD',
      validityPeriod: '3 lata',
      prerequisites: 'Zalecane minimum 2 lata doświadczenia w administracji IT'
    },
    {
      id: 5,
      name: 'Oracle Certified Professional, Java SE 11 Developer',
      category: 'programming',
      provider: 'Oracle',
      difficulty: 'intermediate',
      description: 'Certyfikat potwierdzający umiejętności programowania w języku Java SE 11.',
      examCost: '245 USD',
      validityPeriod: 'Bezterminowo',
      prerequisites: 'Brak formalnych wymagań wstępnych'
    },
    {
      id: 6,
      name: 'Microsoft Certified: Azure Database Administrator Associate',
      category: 'database',
      provider: 'Microsoft',
      difficulty: 'intermediate',
      description: 'Certyfikat potwierdzający umiejętności wdrażania i zarządzania bazami danych SQL i NoSQL w chmurze Azure.',
      examCost: '165 USD',
      validityPeriod: '2 lata',
      prerequisites: 'Zalecane doświadczenie z bazami danych w Azure'
    }
  ];

  // Filtrowanie certyfikatów
  const filteredCertifications = certifications.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || cert.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm 
      ? cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="certifications-page">
      <Container>
        <h1 className="page-title">{t('navigation.certifications')}</h1>
        
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
        
        {/* Filtry */}
        <Row className="filters-section mb-4">
          <Col md={6} className="mb-3">
            <h5>{t('careerCategories.title')}</h5>
            <div className="category-filters">
              {certificationCategories.map(category => (
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
          </Col>
          <Col md={6} className="mb-3">
            <h5>{t('certification.difficulty')}</h5>
            <div className="difficulty-filters">
              {difficultyLevels.map(level => (
                <Button
                  key={level.id}
                  variant={selectedDifficulty === level.id ? 'primary' : 'outline-primary'}
                  className="difficulty-filter-btn me-2 mb-2"
                  onClick={() => setSelectedDifficulty(level.id)}
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
        
        {/* Lista certyfikatów */}
        <Row>
          {filteredCertifications.length > 0 ? (
            filteredCertifications.map(cert => (
              <Col key={cert.id} md={6} className="mb-4">
                <Card className="certification-card h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Card.Title>{cert.name}</Card.Title>
                      <Badge 
                        bg="light" 
                        text="dark" 
                        className="difficulty-badge"
                      >
                        {t(`common.${cert.difficulty}`)}
                      </Badge>
                    </div>
                    
                    <div className="provider mb-3">
                      <strong>{t('certification.provider')}:</strong> {cert.provider}
                    </div>
                    
                    <Card.Text>{cert.description}</Card.Text>
                    
                    <ListGroup variant="flush" className="certification-details">
                      <ListGroup.Item>
                        <strong>{t('certification.cost')}:</strong> {cert.examCost}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>{t('certification.validityPeriod')}:</strong> {cert.validityPeriod}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>{t('certification.prerequisites')}:</strong> {cert.prerequisites}
                      </ListGroup.Item>
                    </ListGroup>
                    
                    <Button 
                      variant="primary"
                      className="mt-3 w-100"
                      href={`https://www.google.com/search?q=${encodeURIComponent(cert.name)}`}
                      target="_blank"
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

export default CertificationsPage;
