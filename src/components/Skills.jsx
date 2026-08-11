import React from 'react';
import { skillCategories } from '../data/skills';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Skills.css';

function Skills() {
  const { t } = useLanguage();

  return (
    <section className="skills" id="skills">
      <div className="container">
        <span className="section-label">{t.skills.label}</span>
        <h2>{t.skills.title}</h2>

        <div className="skills-grid">
          {skillCategories.map((group, index) => (
            <div className="skill-card" key={index}>
              <h3>{group.category}</h3>
              <div className="skill-tags">
                {group.items.map((item, i) => (
                  <span className="skill-tag" key={i}>{item.name}</span>
                ))}
              </div>

              <div className="skill-levels">
                {group.items.map((item, i) => (
                  <div className="skill-level-row" key={i}>
                    <span className="skill-level-name">{item.name}</span>
                    <div className="skill-level-bar">
                      <div
                        className="skill-level-fill"
                        style={{ width: `${(item.level / 5) * 100}%` }}
                      />
                    </div>
                    <span className="skill-level-value">{item.level}/5</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-legend">
          <span className="skills-legend-title">{t.skills.legendTitle}</span>
          <div className="skills-legend-items">
            {t.skills.levels.map((desc, index) => (
              <div className="skills-legend-item" key={index}>
                <span className="skills-legend-number">{index + 1}</span>
                <span className="skills-legend-desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
