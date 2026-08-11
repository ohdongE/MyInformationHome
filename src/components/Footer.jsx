import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Footer.css';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <nav className="footer-links">
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#certifications">{t.nav.certifications}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="footer-middle">
            <p>{t.footer.copyright}</p>
          </div>

          <div className="footer-social">
            <a href="https://github.com/ohdongE" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:dhtjddnjs562@gmail.com">{t.footer.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
