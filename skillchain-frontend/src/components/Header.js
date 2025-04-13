import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <strong>{t('app.title')}</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown 
              title={t(`languages.${i18n.language}`)} 
              id="language-dropdown"
              className="language-dropdown"
            >
              <NavDropdown.Item onClick={() => changeLanguage('pl')}>
                {t('languages.pl')}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('en')}>
                {t('languages.en')}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('de')}>
                {t('languages.de')}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('uk')}>
                {t('languages.uk')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
