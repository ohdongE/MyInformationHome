import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Projects.css';

function Projects() {
  const { t } = useLanguage();

  return (
    <section className="projects" id="projects">
      <div className="container">
        <span className="section-label">{t.projects.label}</span>
        <h2>{t.projects.title}</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
