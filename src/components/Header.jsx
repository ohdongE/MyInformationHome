import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'certifications', label: t.nav.certifications },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Logo />
          </div>

          <div className="nav-wrapper">
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </button>
              ))}
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

            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              aria-label="menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
