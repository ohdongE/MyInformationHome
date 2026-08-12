import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Hero.css';

// Cloudflare Workers + KV 기반 방문자 카운터 (같은 방문자는 하루 1회만 집계)
const VISITOR_API = 'https://visitor-counter.dhtjddnjs125.workers.dev';

function Hero() {
  const { t } = useLanguage();
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(VISITOR_API)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.today === 'number') {
          setVisitors(data.today);
        }
      })
      .catch(() => {});   // 카운터 실패는 화면에 영향 없이 조용히 무시
    return () => { cancelled = true; };
  }, []);

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

            {visitors !== null && (
              <p className="hero-visitors">{t.hero.visitors(visitors)}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
