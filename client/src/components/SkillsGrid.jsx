// src/components/SkillsGrid.jsx

import { motion } from 'framer-motion';
import './SkillsGrid.css';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    color: 'var(--color-gold)',
    skills: [
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'Java',              level: 82 },
      { name: 'PHP',               level: 78 },
      { name: 'SQL',               level: 80 },
    ],
  },
  {
    category: 'Frontend',
    color: 'var(--color-sky)',
    skills: [
      { name: 'React.js',     level: 85 },
      { name: 'Redux Toolkit',level: 78 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'HTML5 / CSS3', level: 90 },
    ],
  },
  {
    category: 'Backend & DB',
    color: 'var(--color-orange)',
    skills: [
      { name: 'Node.js / Express', level: 82 },
      { name: 'MongoDB',           level: 78 },
      { name: 'MySQL',             level: 83 },
      { name: 'Oracle SQL',        level: 75 },
    ],
  },
  {
    category: 'Tools & Practices',
    color: 'var(--color-pink)',
    skills: [
      { name: 'Git & GitHub',    level: 85 },
      { name: 'Docker',          level: 65 },
      { name: 'REST APIs',       level: 88 },
      { name: 'OOP & MVC',       level: 85 },
    ],
  },
];

function SkillBar({ name, level, color, index }) {
  return (
    <div className="skill-bar-wrap">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span className="skill-bar-pct">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function SkillsGrid() {
  return (
    <div className="skills-grid">
      {SKILL_GROUPS.map((group, gi) => (
        <motion.div
          key={group.category}
          className="skill-group glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: gi * 0.12 }}
        >
          <div className="skill-group__header">
            <div
              className="skill-group__dot"
              style={{ background: group.color }}
            />
            <h4 className="skill-group__title">{group.category}</h4>
          </div>
          <div className="skill-group__bars">
            {group.skills.map((s, si) => (
              <SkillBar
                key={s.name}
                name={s.name}
                level={s.level}
                color={group.color}
                index={si}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
