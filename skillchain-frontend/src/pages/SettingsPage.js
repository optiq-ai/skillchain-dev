import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './SettingsPage.css';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const languages = [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'uk', name: 'Українська' }
  ];

  const themes = [
    { id: 'light', name: 'Jasny' },
    { id: 'dark', name: 'Ciemny' },
    { id: 'system', name: 'Systemowy' }
  ];

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    // Tutaj można dodać logikę zmiany motywu
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleSaveSettings = () => {
    // Tutaj można dodać logikę zapisywania ustawień
    alert('Ustawienia zostały zapisane');
  };

  return (
    <div className="settings-page">
      <Container>
        <h1 className="page-title">{t('settings.title')}</h1>
        
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="settings-card mb-4">
              <Card.Body>
                <h2 className="settings-section-title">{t('settings.language')}</h2>
                <p className="settings-section-description">
                  Wybierz preferowany język interfejsu aplikacji
                </p>
                
                <div className="language-options">
                  {languages.map(lang => (
                    <Button
                      key={lang.code}
                      variant={selectedLanguage === lang.code ? 'primary' : 'outline-primary'}
                      className="language-option-btn me-2 mb-2"
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            <Card className="settings-card mb-4">
              <Card.Body>
                <h2 className="settings-section-title">{t('settings.theme')}</h2>
                <p className="settings-section-description">
                  Wybierz motyw kolorystyczny aplikacji
                </p>
                
                <div className="theme-options">
                  {themes.map(themeOption => (
                    <Button
                      key={themeOption.id}
                      variant={theme === themeOption.id ? 'primary' : 'outline-primary'}
                      className="theme-option-btn me-2 mb-2"
                      onClick={() => handleThemeChange(themeOption.id)}
                    >
                      {themeOption.name}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            <Card className="settings-card mb-4">
              <Card.Body>
                <h2 className="settings-section-title">{t('settings.notifications')}</h2>
                <p className="settings-section-description">
                  Zarządzaj ustawieniami powiadomień
                </p>
                
                <Form.Check 
                  type="switch"
                  id="notifications-switch"
                  label="Włącz powiadomienia"
                  checked={notifications}
                  onChange={handleNotificationsChange}
                  className="mb-3"
                />
              </Card.Body>
            </Card>
            
            <Card className="settings-card mb-4">
              <Card.Body>
                <h2 className="settings-section-title">{t('settings.about')}</h2>
                <p className="settings-section-description">
                  Informacje o aplikacji SkillChain
                </p>
                
                <div className="about-info">
                  <p><strong>Wersja:</strong> 1.0.0</p>
                  <p><strong>Autorzy:</strong> Szamani.AI</p>
                  <p><strong>Kontakt:</strong> ai@optiq.net.pl</p>
                </div>
              </Card.Body>
            </Card>
            
            <div className="text-center mb-5">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleSaveSettings}
              >
                {t('common.save')}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SettingsPage;
