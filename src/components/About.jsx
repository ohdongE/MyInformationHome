import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/About.css';

function About() {
  const { t } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="container">
        <span className="section-label">{t.about.label}</span>
        <h2>{t.about.title}</h2>

        <div className="about-content">
          <p className="about-intro">
            {t.about.intro}
          </p>

          <div className="about-strengths">
            {t.about.strengths.map((item, index) => (
              <div className="strength-card" key={index}>
                <span className="strength-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="strength-text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
