import React from 'react';
import Logo from '../assets/Logo';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Header.css';

const LANGUAGES = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JP' },
];

function Header() {
  const { lang, setLang, t } = useLanguage();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Logo />
          </div>
          <div className="nav-wrapper">
            <nav className="nav">
              <button onClick={() => scrollToSection('home')}>{t.nav.home}</button>
              <button onClick={() => scrollToSection('about')}>{t.nav.about}</button>
              <button onClick={() => scrollToSection('certifications')}>{t.nav.certifications}</button>
              <button onClick={() => scrollToSection('skills')}>{t.nav.skills}</button>
              <button onClick={() => scrollToSection('projects')}>{t.nav.projects}</button>
              <button onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
            </nav>

            <div className="lang-switcher">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  className={lang === item.code ? 'active' : ''}
                  onClick={() => setLang(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
