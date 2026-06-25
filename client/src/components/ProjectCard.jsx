// src/components/ProjectCard.jsx

import { motion } from 'framer-motion';
import './ProjectCard.css';

export default function ProjectCard({ project, index }) {
  const { title, description, tags, github, live, emoji, gradient, category } = project;

  return (
    <motion.article
      className="proj-card glass-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, rotate: -0.4 }}
    >
      {/* Header */}
      <div className="proj-card__header" style={{ background: gradient }}>
        <span className="proj-card__emoji">{emoji}</span>
        <span className="proj-card__cat badge badge-sky">{category}</span>
      </div>

      {/* Body */}
      <div className="proj-card__body">
        <h3 className="proj-card__title">{title}</h3>
        <p className="proj-card__desc">{description}</p>

        <div className="proj-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="proj-tag">{tag}</span>
          ))}
        </div>

        <div className="proj-card__links">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card__link"
            >
              GitHub ↗
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card__link proj-card__link--live"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
