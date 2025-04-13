import React from 'react';
import { useTranslation } from 'react-i18next';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          {t('navigation.home')}
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/career-paths" 
          className={location.pathname.includes('/career-paths') ? 'active' : ''}
        >
          {t('navigation.careerPaths')}
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/skills" 
          className={location.pathname.includes('/skills') ? 'active' : ''}
        >
          {t('navigation.skills')}
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/certifications" 
          className={location.pathname.includes('/certifications') ? 'active' : ''}
        >
          {t('navigation.certifications')}
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/settings" 
          className={location.pathname.includes('/settings') ? 'active' : ''}
        >
          {t('navigation.settings')}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
