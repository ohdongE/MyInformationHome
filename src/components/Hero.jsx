import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Hero.css';

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-image">
            <img src="/assets/images/profile.png" alt={t.hero.name} />
          </div>

          <div className="hero-content">
            <h1 className="hero-title">{t.hero.name}</h1>

            <p className="hero-subtitle1">
              {t.hero.role1}
            </p>
            <p className="hero-subtitle2">
              {t.hero.role2}
            </p>

            <p className="hero-description">
              {t.hero.description}
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                {t.hero.btnPortfolio}
              </button>
              <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                {t.hero.btnContact}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
