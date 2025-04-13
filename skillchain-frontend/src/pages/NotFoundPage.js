import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <Container className="text-center">
        <div className="error-code">404</div>
        <h1>{t('errors.pageNotFound')}</h1>
        <p className="error-message">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <a href="/" className="btn btn-primary mt-4">
          {t('common.back')}
        </a>
      </Container>
    </div>
  );
};

export default NotFoundPage;
