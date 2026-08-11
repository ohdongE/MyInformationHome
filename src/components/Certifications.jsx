import React, { useState } from 'react';
import { featuredCertifications, otherCertifications } from '../data/certifications';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Certifications.css';

const COLLAPSED_COUNT = 4;

function Certifications() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const visibleCerts = showAll
    ? otherCertifications
    : otherCertifications.slice(0, COLLAPSED_COUNT);

  return (
    <section className="certifications" id="certifications">
      <div className="container">
        <span className="section-label">{t.certifications.label}</span>
        <h2>{t.certifications.title}</h2>

        <div className="cert-featured-grid">
          {featuredCertifications.map((cert, index) => (
            <div className="cert-featured-card" key={index}>
              <div className="cert-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="5.5" stroke="#000" strokeWidth="1.6" />
                  <path d="M9 12.5L7 20L12 17.5L17 20L15 12.5" stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              
              <h3>{cert.name}</h3>
              <p>{cert.org}</p>
            </div>
          ))}
        </div>

        <h4 className="cert-others-title">{t.certifications.othersTitle}</h4>

        <div className="cert-list">
          {visibleCerts.map((cert, index) => (
            <div className="cert-row" key={index}>
              <span className="cert-date">{cert.date}</span>
              <span className="cert-name">{cert.name}</span>
              <span className="cert-org">{cert.org}</span>
            </div>
          ))}
        </div>

        {otherCertifications.length > COLLAPSED_COUNT && (
          <button className="cert-toggle" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? t.certifications.showLess
              : `${t.certifications.showMore} (+${otherCertifications.length - COLLAPSED_COUNT})`}
          </button>
        )}
      </div>
    </section>
  );
}

export default Certifications;
