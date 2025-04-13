import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const { t } = useTranslation();

  const careerCategories = [
    { id: 'networking', icon: '🌐', color: '#4285F4' },
    { id: 'programming', icon: '💻', color: '#34A853' },
    { id: 'databases', icon: '🗄️', color: '#FBBC05' },
    { id: 'projectManagement', icon: '📊', color: '#EA4335' },
    { id: 'cybersecurity', icon: '🔒', color: '#8E44AD' },
    { id: 'devops', icon: '⚙️', color: '#F39C12' },
    { id: 'aiMl', icon: '🧠', color: '#1ABC9C' }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <Container>
          <h1>{t('app.title')}</h1>
          <p className="lead">{t('app.subtitle')}</p>
        </Container>
      </div>

      <Container className="mt-5">
        <h2 className="section-title">{t('navigation.careerPaths')}</h2>
        <p className="section-description">
          Wybierz kategorię, aby odkryć ścieżki kariery w IT
        </p>

        <Row className="mt-4">
          {careerCategories.map((category) => (
            <Col key={category.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card 
                className="career-category-card"
                style={{ borderColor: category.color }}
              >
                <Card.Body>
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <Card.Title>{t(`careerCategories.${category.id}`)}</Card.Title>
                  <Button 
                    as={Link}
                    to={`/career-paths?category=${category.id}`}
                    variant="outline-primary"
                    className="mt-3"
                  >
                    {t('common.viewDetails')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6}>
            <h2 className="section-title">{t('navigation.skills')}</h2>
            <p className="section-description">
              Odkryj umiejętności potrzebne do rozwoju kariery w IT
            </p>
            <Button 
              as={Link}
              to="/skills"
              variant="primary"
              className="mt-3"
            >
              {t('common.viewDetails')}
            </Button>
          </Col>
          <Col md={6}>
            <h2 className="section-title">{t('navigation.certifications')}</h2>
            <p className="section-description">
              Poznaj certyfikaty, które pomogą Ci w karierze IT
            </p>
            <Button 
              as={Link}
              to="/certifications"
              variant="primary"
              className="mt-3"
            >
              {t('common.viewDetails')}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
