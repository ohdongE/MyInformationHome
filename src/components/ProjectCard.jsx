import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function ProjectCard({ project }) {
  const { t } = useLanguage();

  return (
    <div className="project-card">
      <h3>{project.title}</h3>

      <hr className="card-divider" />

      <p>{project.description}</p>

      <hr className="card-divider" />

      <div className="tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      <hr className="card-divider" />

      <div className="links">
        {project.github && (
          <a href={project.github} className="link-btn" target="_blank" rel="noopener noreferrer">
            {t.projects.github}
            <span className="link-btn-arrow">→</span>
          </a>
        )}
        {project.demo && (
          <a href={project.demo} className="link-btn link-btn-outline" target="_blank" rel="noopener noreferrer">
            {t.projects.demo}
            <span className="link-btn-arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
