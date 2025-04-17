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
          // Pobierz dane z pliku markdown
          fetch(foundPath.path)
            .then(response => response.text())
            .then(markdownContent => {
              // Parsowanie markdown do struktury danych
              // Dla uproszczenia, używamy podstawowej struktury
              const positions = [];
              const certifications = [];
              
              // Dodajemy dane dla wszystkich ścieżek kariery
              if (id === 'programming') {
                positions.push(
                  {
                    id: 1,
                    title: 'Frontend Developer',
                    level: 'beginner',
                    salaryRange: '5,000 - 9,000 PLN',
                    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design', 'TypeScript', 'Redux', 'GraphQL'],
                    description: 'Frontend developer zajmuje się projektowaniem i implementacją wizualnej części strony internetowej lub aplikacji.'
                  },
                  {
                    id: 2,
                    title: 'Backend Developer',
                    level: 'intermediate',
                    salaryRange: '9,000 - 16,000 PLN',
                    skills: ['Python', 'Java', 'Node.js', 'SQL', 'REST API', 'Microservices', 'Docker', 'Kubernetes'],
                    description: 'Backend developer odpowiada za tzw. wnętrze strony internetowej lub aplikacji - to, czego użytkownik nie widzi.'
                  },
                  {
                    id: 3,
                    title: 'Full Stack Developer',
                    level: 'advanced',
                    salaryRange: '16,000 - 25,000 PLN',
                    skills: ['Frontend', 'Backend', 'DevOps', 'Architektura aplikacji', 'Bazy danych', 'Cloud Computing', 'System Design'],
                    description: 'Fullstack developer to specjalista, który posiada umiejętności zarówno frontendowe, jak i backendowe.'
                  }
                );
                
                certifications.push(
                  { name: 'React - Meta React Professional Certificate', provider: 'Meta', difficulty: 'intermediate' },
                  { name: 'AWS Certified Developer - Associate', provider: 'Amazon', difficulty: 'intermediate' },
                  { name: 'Certified Kubernetes Administrator (CKA)', provider: 'CNCF', difficulty: 'advanced' },
                  { name: 'Google Associate Cloud Engineer', provider: 'Google', difficulty: 'intermediate' },
                  { name: 'Oracle Certified Professional, Java SE Developer', provider: 'Oracle', difficulty: 'advanced' },
                  { name: 'Microsoft Certified: Azure Developer Associate', provider: 'Microsoft', difficulty: 'intermediate' },
                  { name: 'Certified Web3 Developer', provider: 'Blockchain Council', difficulty: 'advanced' }
                );
              } else if (id === 'network') {
                positions.push(
                  {
                    id: 1,
                    title: 'Network Administrator',
                    level: 'beginner',
                    salaryRange: '6,000 - 9,000 PLN',
                    skills: ['TCP/IP', 'Routing', 'Switching', 'Network Security', 'Troubleshooting'],
                    description: 'Odpowiada za codzienne zarządzanie siecią komputerową, w tym konfigurację, monitorowanie i rozwiązywanie problemów.'
                  },
                  {
                    id: 2,
                    title: 'Network Engineer',
                    level: 'intermediate',
                    salaryRange: '10,000 - 15,000 PLN',
                    skills: ['CCNA/CCNP', 'VPN', 'Firewalls', 'Load Balancing', 'Network Design'],
                    description: 'Projektuje, implementuje i optymalizuje sieci komputerowe, zapewniając ich wydajność, bezpieczeństwo i skalowalność.'
                  },
                  {
                    id: 3,
                    title: 'Network Architect',
                    level: 'advanced',
                    salaryRange: '16,000 - 25,000 PLN',
                    skills: ['Enterprise Networking', 'Cloud Networking', 'Network Virtualization', 'SD-WAN', 'Strategic Planning'],
                    description: 'Tworzy kompleksowe projekty sieci dla organizacji, planuje długoterminowe strategie rozwoju infrastruktury sieciowej.'
                  }
                );
                
                certifications.push(
                  { name: 'Cisco CCNA', provider: 'Cisco', difficulty: 'beginner' },
                  { name: 'Cisco CCNP Enterprise', provider: 'Cisco', difficulty: 'intermediate' },
                  { name: 'Cisco CCIE Enterprise', provider: 'Cisco', difficulty: 'advanced' },
                  { name: 'CompTIA Network+', provider: 'CompTIA', difficulty: 'beginner' },
                  { name: 'Juniper JNCIA', provider: 'Juniper', difficulty: 'beginner' }
                );
              } else if (id === 'database') {
                positions.push(
                  {
                    id: 1,
                    title: 'Database Administrator',
                    level: 'beginner',
                    salaryRange: '7,000 - 11,000 PLN',
                    skills: ['SQL', 'MySQL', 'PostgreSQL', 'Backup & Recovery', 'Performance Tuning'],
                    description: 'Odpowiada za instalację, konfigurację, aktualizację i zabezpieczanie systemów baz danych.'
                  },
                  {
                    id: 2,
                    title: 'Database Developer',
                    level: 'intermediate',
                    salaryRange: '11,000 - 18,000 PLN',
                    skills: ['SQL', 'PL/SQL', 'Stored Procedures', 'Database Design', 'ETL'],
                    description: 'Projektuje i implementuje struktury baz danych, zapytania i procedury.'
                  },
                  {
                    id: 3,
                    title: 'Data Architect',
                    level: 'advanced',
                    salaryRange: '18,000 - 28,000 PLN',
                    skills: ['Data Modeling', 'Big Data', 'Data Warehousing', 'NoSQL', 'Data Governance'],
                    description: 'Projektuje kompleksowe rozwiązania bazodanowe dla organizacji, tworzy strategie zarządzania danymi.'
                  }
                );
                
                certifications.push(
                  { name: 'Oracle Database SQL Certified Associate', provider: 'Oracle', difficulty: 'beginner' },
                  { name: 'Microsoft Certified: Azure Database Administrator Associate', provider: 'Microsoft', difficulty: 'intermediate' },
                  { name: 'MongoDB Certified DBA Associate', provider: 'MongoDB', difficulty: 'intermediate' },
                  { name: 'AWS Certified Database - Specialty', provider: 'Amazon', difficulty: 'advanced' },
                  { name: 'Certified Data Management Professional (CDMP)', provider: 'DAMA', difficulty: 'advanced' }
                );
              } else if (id === 'project-management') {
                positions.push(
                  {
                    id: 1,
                    title: 'Project Manager',
                    level: 'beginner',
                    salaryRange: '8,000 - 14,000 PLN',
                    skills: ['Zarządzanie projektami', 'MS Project', 'Komunikacja', 'Dokumentacja projektowa', 'Raportowanie'],
                    description: 'Odpowiada za planowanie, realizację i zamknięcie projektów IT zgodnie z wymaganiami, budżetem i harmonogramem.'
                  },
                  {
                    id: 2,
                    title: 'Scrum Master',
                    level: 'intermediate',
                    salaryRange: '12,000 - 18,000 PLN',
                    skills: ['Scrum', 'Agile', 'Facylitacja', 'Usuwanie przeszkód', 'Coaching zespołu'],
                    description: 'Wspiera zespół w stosowaniu metodyki Scrum, usuwa przeszkody i facylituje wydarzenia scrumowe.'
                  },
                  {
                    id: 3,
                    title: 'Product Owner',
                    level: 'advanced',
                    salaryRange: '15,000 - 25,000 PLN',
                    skills: ['Zarządzanie produktem', 'Backlog produktu', 'Priorytetyzacja', 'Analiza biznesowa', 'UX'],
                    description: 'Definiuje wizję produktu, zarządza backlogiem i priorytetyzuje funkcjonalności w oparciu o wartość biznesową.'
                  }
                );
                
                certifications.push(
                  { name: 'Project Management Professional (PMP)', provider: 'PMI', difficulty: 'advanced' },
                  { name: 'Certified ScrumMaster (CSM)', provider: 'Scrum Alliance', difficulty: 'beginner' },
                  { name: 'Professional Scrum Product Owner (PSPO)', provider: 'Scrum.org', difficulty: 'intermediate' },
                  { name: 'PRINCE2 Foundation & Practitioner', provider: 'AXELOS', difficulty: 'intermediate' },
                  { name: 'PMI Agile Certified Practitioner (PMI-ACP)', provider: 'PMI', difficulty: 'intermediate' }
                );
              } else if (id === 'cybersecurity') {
                positions.push(
                  {
                    id: 1,
                    title: 'Security Analyst',
                    level: 'beginner',
                    salaryRange: '7,000 - 12,000 PLN',
                    skills: ['Analiza zagrożeń', 'SIEM', 'Monitoring bezpieczeństwa', 'Reagowanie na incydenty', 'Skanowanie podatności'],
                    description: 'Monitoruje systemy pod kątem zagrożeń bezpieczeństwa, analizuje incydenty i wdraża środki zaradcze.'
                  },
                  {
                    id: 2,
                    title: 'Penetration Tester',
                    level: 'intermediate',
                    salaryRange: '12,000 - 20,000 PLN',
                    skills: ['Ethical Hacking', 'Testy penetracyjne', 'Narzędzia bezpieczeństwa', 'Analiza podatności', 'Socjotechnika'],
                    description: 'Przeprowadza kontrolowane ataki na systemy w celu identyfikacji i naprawy luk w zabezpieczeniach.'
                  },
                  {
                    id: 3,
                    title: 'Security Architect',
                    level: 'advanced',
                    salaryRange: '18,000 - 30,000 PLN',
                    skills: ['Architektura bezpieczeństwa', 'Zarządzanie ryzykiem', 'Compliance', 'Cloud Security', 'Zero Trust'],
                    description: 'Projektuje kompleksowe rozwiązania bezpieczeństwa dla organizacji, tworzy strategie i polityki bezpieczeństwa.'
                  }
                );
                
                certifications.push(
                  { name: 'CompTIA Security+', provider: 'CompTIA', difficulty: 'beginner' },
                  { name: 'Certified Ethical Hacker (CEH)', provider: 'EC-Council', difficulty: 'intermediate' },
                  { name: 'Certified Information Systems Security Professional (CISSP)', provider: 'ISC2', difficulty: 'advanced' },
                  { name: 'Offensive Security Certified Professional (OSCP)', provider: 'Offensive Security', difficulty: 'advanced' },
                  { name: 'Certified Cloud Security Professional (CCSP)', provider: 'ISC2', difficulty: 'advanced' }
                );
              } else if (id === 'devops') {
                positions.push(
                  {
                    id: 1,
                    title: 'DevOps Engineer',
                    level: 'beginner',
                    salaryRange: '8,000 - 14,000 PLN',
                    skills: ['CI/CD', 'Docker', 'Git', 'Linux', 'Automatyzacja'],
                    description: 'Wdraża praktyki DevOps, automatyzuje procesy CI/CD i zarządza infrastrukturą.'
                  },
                  {
                    id: 2,
                    title: 'Site Reliability Engineer',
                    level: 'intermediate',
                    salaryRange: '14,000 - 22,000 PLN',
                    skills: ['Kubernetes', 'Monitoring', 'Infrastruktura jako kod', 'Cloud', 'Rozwiązywanie problemów'],
                    description: 'Zapewnia niezawodność, skalowalność i wydajność systemów produkcyjnych.'
                  },
                  {
                    id: 3,
                    title: 'DevOps Architect',
                    level: 'advanced',
                    salaryRange: '20,000 - 30,000 PLN',
                    skills: ['Architektura systemów', 'Multi-cloud', 'Bezpieczeństwo DevOps', 'Strategia DevOps', 'Optymalizacja kosztów'],
                    description: 'Projektuje kompleksowe rozwiązania DevOps dla organizacji, tworzy strategie transformacji DevOps.'
                  }
                );
                
                certifications.push(
                  { name: 'AWS Certified DevOps Engineer - Professional', provider: 'Amazon', difficulty: 'advanced' },
                  { name: 'Certified Kubernetes Administrator (CKA)', provider: 'CNCF', difficulty: 'intermediate' },
                  { name: 'Microsoft Certified: DevOps Engineer Expert', provider: 'Microsoft', difficulty: 'advanced' },
                  { name: 'Docker Certified Associate', provider: 'Docker', difficulty: 'intermediate' },
                  { name: 'Terraform Associate', provider: 'HashiCorp', difficulty: 'intermediate' }
                );
              } else if (id === 'ai-ml') {
                positions.push(
                  {
                    id: 1,
                    title: 'Data Scientist',
                    level: 'beginner',
                    salaryRange: '10,000 - 16,000 PLN',
                    skills: ['Python', 'R', 'SQL', 'Statystyka', 'Wizualizacja danych'],
                    description: 'Analizuje dane, buduje modele statystyczne i uczenia maszynowego, wyciąga wnioski z danych.'
                  },
                  {
                    id: 2,
                    title: 'Machine Learning Engineer',
                    level: 'intermediate',
                    salaryRange: '15,000 - 25,000 PLN',
                    skills: ['Deep Learning', 'TensorFlow/PyTorch', 'MLOps', 'Przetwarzanie danych', 'Wdrażanie modeli'],
                    description: 'Projektuje, buduje i wdraża modele uczenia maszynowego do zastosowań produkcyjnych.'
                  },
                  {
                    id: 3,
                    title: 'AI Researcher',
                    level: 'advanced',
                    salaryRange: '25,000 - 40,000 PLN',
                    skills: ['Zaawansowane algorytmy ML', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Publikacje naukowe'],
                    description: 'Prowadzi badania nad nowymi algorytmami i metodami sztucznej inteligencji, publikuje prace naukowe.'
                  }
                );
                
                certifications.push(
                  { name: 'TensorFlow Developer Certificate', provider: 'Google', difficulty: 'intermediate' },
                  { name: 'AWS Certified Machine Learning - Specialty', provider: 'Amazon', difficulty: 'advanced' },
                  { name: 'Microsoft Certified: Azure AI Engineer Associate', provider: 'Microsoft', difficulty: 'intermediate' },
                  { name: 'IBM AI Engineering Professional Certificate', provider: 'IBM', difficulty: 'intermediate' },
                  { name: 'Deep Learning Specialization', provider: 'Coursera/DeepLearning.AI', difficulty: 'intermediate' }
                );
              }
              
              // Konwersja do formatu oczekiwanego przez komponent
              setCareerPath({
                id: foundPath.id,
                category: foundPath.id,
                icon: foundPath.icon,
                color: foundPath.color,
                difficulty: 3,
                title: foundPath.title,
                description: foundPath.description,
                positions: positions,
                certifications: certifications,
                resources: [
                  { type: 'book', title: 'Profesjonalny przewodnik po ' + foundPath.title, author: 'Ekspert Branżowy' },
                  { type: 'course', title: 'Kurs ' + foundPath.title + ' od podstaw', platform: 'Udemy' },
                  { type: 'website', title: 'Dokumentacja ' + foundPath.title, url: 'https://example.com/' + foundPath.id }
                ]
              });
            })
            .catch(error => {
              console.error('Error loading markdown:', error);
              // Fallback w przypadku błędu
              setCareerPath({
                id: foundPath.id,
                category: foundPath.id,
                icon: foundPath.icon,
                color: foundPath.color,
                difficulty: 3,
                title: foundPath.title,
                description: foundPath.description
              });
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
