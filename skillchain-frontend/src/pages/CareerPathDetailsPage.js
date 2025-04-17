import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, ListGroup, Alert } from 'react-bootstrap';
import './CareerPathDetailsPage.css';
import careerPaths from '../data/careerData';
import financeCareerData from '../data/financeCareerData';

const CareerPathDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('positions');
  const [isFinanceCareer, setIsFinanceCareer] = useState(false);

  // Przykładowe dane ścieżki kariery dla IT
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

  // Funkcja renderująca emoji dla ikon
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

  useEffect(() => {
    // Sprawdź, czy to ścieżka kariery w finansach
    if (id === 'finance') {
      setIsFinanceCareer(true);
      setCareerPath({
        id: 'finance',
        category: 'finance',
        icon: 'money-bill-wave',
        color: '#2E7D32',
        difficulty: 4,
        title: financeCareerData.title,
        description: financeCareerData.description
      });
      setLoading(false);
    } else {
      // Dla innych ścieżek kariery, symulacja pobierania danych z API
      setTimeout(() => {
        // Próba znalezienia ścieżki kariery w careerPaths
        const foundPath = careerPaths.find(path => path.id === id);
        if (foundPath) {
          // Konwersja do formatu oczekiwanego przez komponent
          setCareerPath({
            id: foundPath.id,
            category: foundPath.id,
            icon: foundPath.icon,
            color: foundPath.color,
            difficulty: 3,
            title: foundPath.title,
            description: foundPath.description
          });
        } else {
          // Fallback do starych danych
          setCareerPath(careerPathsData[id]);
        }
        setLoading(false);
      }, 500);
    }
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
        <Alert variant="warning">
          <p>{t('errors.somethingWentWrong')}</p>
          <Button variant="primary" onClick={() => navigate('/career-paths')}>
            Powrót do listy ścieżek kariery
          </Button>
        </Alert>
      </Container>
    );
  }

  // Renderowanie pozycji dla ścieżki kariery w finansach
  const renderFinancePositions = () => {
    return (
      <Row>
        {financeCareerData.levels.map((level, index) => (
          <Col key={level.id} md={4} className="mb-4">
            <Card className="position-card h-100">
              <Card.Body>
                <Card.Title>{level.title}</Card.Title>
                <Badge 
                  bg="light" 
                  text="dark" 
                  className="level-badge mb-3"
                >
                  {level.titleEn}
                </Badge>
                <Card.Text>
                  {level.positions && level.positions.length > 0 && (
                    <div className="mb-3">
                      <h6>Przykładowe stanowiska:</h6>
                      <ul className="position-list">
                        {level.positions.map((position, idx) => (
                          <li key={idx}>{position}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card.Text>
                
                <h6>Wymagane umiejętności:</h6>
                <div className="skills-list mb-3">
                  {level.skills.slice(0, 5).map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      bg="primary" 
                      className="skill-badge me-2 mb-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {level.skills.length > 5 && (
                    <Badge 
                      bg="secondary" 
                      className="skill-badge me-2 mb-2"
                    >
                      +{level.skills.length - 5} więcej
                    </Badge>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  // Renderowanie certyfikatów dla ścieżki kariery w finansach
  const renderFinanceCertifications = () => {
    return (
      <div>
        {financeCareerData.certifications.map((certGroup) => (
          <div key={certGroup.id} className="mb-4">
            <h4>{certGroup.title}</h4>
            <ListGroup>
              {certGroup.items.map((cert, index) => (
                <ListGroup.Item key={index} className="certification-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{cert}</h5>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ))}
      </div>
    );
  };

  // Renderowanie specjalizacji dla ścieżki kariery w finansach
  const renderFinanceSpecializations = () => {
    return (
      <Row>
        {financeCareerData.specializations.map((spec) => (
          <Col key={spec.id} md={6} className="mb-4">
            <Card className="specialization-card h-100">
              <Card.Body>
                <Card.Title>{spec.title}</Card.Title>
                <Card.Text>{spec.description}</Card.Text>
                
                <h6>Kluczowe umiejętności:</h6>
                <div className="skills-list mb-3">
                  {spec.skills.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      bg="info" 
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
    );
  };

  // Renderowanie narzędzi dla ścieżki kariery w finansach
  const renderFinanceTools = () => {
    return (
      <div>
        {financeCareerData.tools.map((toolGroup) => (
          <div key={toolGroup.id} className="mb-4">
            <h4>{toolGroup.title}</h4>
            <ListGroup>
              {toolGroup.items.map((tool, index) => (
                <ListGroup.Item key={index} className="resource-item">
                  <div>
                    <Badge 
                      bg="secondary" 
                      className="resource-type-badge me-2"
                    >
                      {toolGroup.id}
                    </Badge>
                    <h5>{tool}</h5>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="career-path-details-page">
      <Container>
        <div 
          className="path-header"
          style={{ backgroundColor: careerPath.color }}
        >
          <div className="path-icon-large">{renderIcon(careerPath.icon)}</div>
          <h1>{careerPath.title || t(`careerCategories.${careerPath.category}`)}</h1>
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

        {isFinanceCareer ? (
          // Specjalne taby dla ścieżki kariery w finansach
          <Tabs 
            defaultActiveKey="positions" 
            className="mb-4 mt-4"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
          >
            <Tab eventKey="positions" title="Poziomy kariery">
              {renderFinancePositions()}
            </Tab>
            
            <Tab eventKey="specializations" title="Specjalizacje">
              {renderFinanceSpecializations()}
            </Tab>
            
            <Tab eventKey="certifications" title="Certyfikaty">
              {renderFinanceCertifications()}
            </Tab>
            
            <Tab eventKey="tools" title="Narzędzia">
              {renderFinanceTools()}
            </Tab>
          </Tabs>
        ) : (
          // Standardowe taby dla innych ścieżek kariery
          <Tabs defaultActiveKey="positions" className="mb-4 mt-4">
            <Tab eventKey="positions" title={t('careerPath.positions')}>
              {careerPath.positions ? (
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
              ) : (
                <Alert variant="info">
                  Szczegółowe informacje o stanowiskach dla tej ścieżki kariery są w trakcie opracowywania.
                </Alert>
              )}
            </Tab>
            
            <Tab eventKey="certifications" title={t('careerPath.certifications')}>
              {careerPath.certifications ? (
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
              ) : (
                <Alert variant="info">
                  Szczegółowe informacje o certyfikatach dla tej ścieżki kariery są w trakcie opracowywania.
                </Alert>
              )}
            </Tab>
            
            <Tab eventKey="resources" title={t('careerPath.resources')}>
              {careerPath.resources ? (
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
              ) : (
                <Alert variant="info">
                  Szczegółowe informacje o zasobach dla tej ścieżki kariery są w trakcie opracowywania.
                </Alert>
              )}
            </Tab>
          </Tabs>
        )}
        
        <div className="text-center mt-4 mb-5">
          <Button 
            variant="outline-primary"
            onClick={() => navigate('/career-paths')}
          >
            {t('common.backToList')}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CareerPathDetailsPage;
