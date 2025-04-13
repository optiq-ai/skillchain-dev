import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, ListGroup } from 'react-bootstrap';
import './CareerPathDetailsPage.css';

const CareerPathDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(true);

  // Przykładowe dane ścieżki kariery
  const careerPathsData = {
    1: {
      id: 1,
      category: 'networking',
      icon: '🌐',
      color: '#4285F4',
      difficulty: 3,
      positions: [
        {
          id: 1,
          title: 'Network Administrator',
          level: 'beginner',
          salaryRange: '6000-9000 PLN',
          skills: ['TCP/IP', 'Routing', 'Switching', 'Network Security', 'Troubleshooting'],
          description: 'Odpowiada za codzienne zarządzanie siecią komputerową, w tym konfigurację, monitorowanie i rozwiązywanie problemów.'
        },
        {
          id: 2,
          title: 'Network Engineer',
          level: 'intermediate',
          salaryRange: '10000-15000 PLN',
          skills: ['CCNA/CCNP', 'VPN', 'Firewalls', 'Load Balancing', 'Network Design'],
          description: 'Projektuje, implementuje i optymalizuje sieci komputerowe, zapewniając ich wydajność, bezpieczeństwo i skalowalność.'
        },
        {
          id: 3,
          title: 'Network Architect',
          level: 'advanced',
          salaryRange: '16000-25000 PLN',
          skills: ['Enterprise Networking', 'Cloud Networking', 'Network Virtualization', 'SD-WAN', 'Strategic Planning'],
          description: 'Tworzy kompleksowe projekty sieci dla organizacji, planuje długoterminowe strategie rozwoju infrastruktury sieciowej.'
        }
      ],
      certifications: [
        { name: 'Cisco CCNA', provider: 'Cisco', difficulty: 'beginner' },
        { name: 'Cisco CCNP Enterprise', provider: 'Cisco', difficulty: 'intermediate' },
        { name: 'Cisco CCIE Enterprise', provider: 'Cisco', difficulty: 'advanced' },
        { name: 'CompTIA Network+', provider: 'CompTIA', difficulty: 'beginner' },
        { name: 'Juniper JNCIA', provider: 'Juniper', difficulty: 'beginner' }
      ],
      resources: [
        { type: 'book', title: 'Computer Networking: A Top-Down Approach', author: 'James Kurose, Keith Ross' },
        { type: 'course', title: 'The Complete Networking Fundamentals Course', platform: 'Udemy' },
        { type: 'website', title: 'Cisco Learning Network', url: 'https://learningnetwork.cisco.com' }
      ]
    },
    // Inne ścieżki kariery byłyby tutaj
  };

  useEffect(() => {
    // Symulacja pobierania danych z API
    setTimeout(() => {
      setCareerPath(careerPathsData[id]);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <p>{t('common.loading')}</p>
      </Container>
    );
  }

  if (!careerPath) {
    return (
      <Container className="text-center py-5">
        <p>{t('errors.somethingWentWrong')}</p>
      </Container>
    );
  }

  return (
    <div className="career-path-details-page">
      <Container>
        <div 
          className="path-header"
          style={{ backgroundColor: careerPath.color }}
        >
          <div className="path-icon-large">{careerPath.icon}</div>
          <h1>{t(`careerCategories.${careerPath.category}`)}</h1>
          <div className="difficulty-indicator">
            <span>{t('common.experienceLevel')}:</span>
            <div className="difficulty-bars">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`difficulty-bar ${i < careerPath.difficulty ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey="positions" className="mb-4 mt-4">
          <Tab eventKey="positions" title={t('careerPath.positions')}>
            <Row>
              {careerPath.positions.map(position => (
                <Col key={position.id} md={4} className="mb-4">
                  <Card className="position-card h-100">
                    <Card.Body>
                      <Card.Title>{position.title}</Card.Title>
                      <Badge 
                        bg="light" 
                        text="dark" 
                        className="level-badge mb-3"
                      >
                        {t(`common.${position.level}`)}
                      </Badge>
                      <Card.Text>{position.description}</Card.Text>
                      
                      <div className="salary-range mb-3">
                        <h6>{t('common.salaryRange')}</h6>
                        <p>{position.salaryRange}</p>
                      </div>
                      
                      <h6>{t('common.requiredSkills')}</h6>
                      <div className="skills-list mb-3">
                        {position.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            bg="primary" 
                            className="skill-badge me-2 mb-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
          
          <Tab eventKey="certifications" title={t('careerPath.certifications')}>
            <ListGroup>
              {careerPath.certifications.map((cert, index) => (
                <ListGroup.Item key={index} className="certification-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{cert.name}</h5>
                      <p className="mb-0">{t('certification.provider')}: {cert.provider}</p>
                    </div>
                    <Badge 
                      bg="light" 
                      text="dark" 
                      className="level-badge"
                    >
                      {t(`common.${cert.difficulty}`)}
                    </Badge>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Tab>
          
          <Tab eventKey="resources" title={t('careerPath.resources')}>
            <ListGroup>
              {careerPath.resources.map((resource, index) => (
                <ListGroup.Item key={index} className="resource-item">
                  <div>
                    <Badge 
                      bg="secondary" 
                      className="resource-type-badge me-2"
                    >
                      {resource.type}
                    </Badge>
                    <h5>{resource.title}</h5>
                    {resource.author && <p className="mb-0">{t('resource.author')}: {resource.author}</p>}
                    {resource.platform && <p className="mb-0">Platform: {resource.platform}</p>}
                    {resource.url && (
                      <Button 
                        variant="link" 
                        className="p-0 mt-2"
                        href={resource.url}
                        target="_blank"
                      >
                        {t('common.viewDetails')}
                      </Button>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default CareerPathDetailsPage;
