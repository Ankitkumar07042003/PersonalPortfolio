// src/components/Timeline.jsx

import { motion } from 'framer-motion';
import './Timeline.css';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="tl-item"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Timeline dot */}
          <div
            className="tl-dot"
            style={item.dotStyle || {}}
          />

          {/* Card */}
          <div className="tl-card glass-card">
            <div className="tl-card__header">
              <div>
                <h3 className="tl-company">{item.company}</h3>
                <p className="tl-role badge badge-orange">{item.role}</p>
              </div>
              <div className="tl-meta">
                <span className="tl-date">{item.date}</span>
                <span className="tl-location">{item.location}</span>
              </div>
            </div>

            <ul className="tl-bullets">
              {item.bullets.map((b, j) => (
                <li key={j}>
                  <span className="tl-arrow">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {item.tags && (
              <div className="tl-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
