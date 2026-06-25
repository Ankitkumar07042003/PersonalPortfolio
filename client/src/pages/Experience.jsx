// src/pages/Experience.jsx

import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';
import './Experience.css';

const EXPERIENCE = [
  {
    company: 'Nexgen Technology Pvt. Ltd.',
    role: 'On-Job Training — PHP & MySQL',
    date: 'Dec 2025 – Jan 2026',
    location: '📍 Ranchi, Jharkhand',
    bullets: [
      'Built dynamic web applications using PHP and MySQL following MVC architecture.',
      'Designed relational database schemas and optimized complex SQL queries.',
      'Implemented full CRUD operations with validation workflows and business logic.',
      'Developed backend modules for data integration and database management.',
      'Participated in debugging, testing, and enhancement of existing applications.',
    ],
    tags: ['PHP', 'MySQL', 'MVC', 'CRUD', 'SQL', 'HTML/CSS'],
  },
  {
    company: 'Launcher Education Pvt. Ltd.',
    role: 'On-Job Training — Java & Oracle',
    date: 'Oct 2025 – Nov 2025',
    location: '📍 Ranchi, Jharkhand',
    bullets: [
      'Developed Java applications using OOP principles (inheritance, polymorphism, abstraction).',
      'Worked with Oracle SQL — complex joins, stored procedures, and transactions.',
      'Implemented exception handling mechanisms and Java Collections Framework.',
      'Strengthened DSA problem-solving skills through structured coding assignments.',
      'Collaborated on software development exercises and produced technical documentation.',
    ],
    tags: ['Java', 'Oracle SQL', 'OOP', 'DSA', 'Collections', 'JDBC'],
  },
];

const EDUCATION = [
  {
    company: 'Doranda College, Ranchi University',
    role: 'Bachelor of Computer Applications (BCA)',
    date: '2022 – 2025',
    location: '📍 Ranchi, Jharkhand',
    dotStyle: {
      background: 'linear-gradient(135deg, var(--color-sky), var(--color-navy))',
      boxShadow: '0 0 0 3px rgba(124, 170, 220, 0.25)',
    },
    bullets: [
      'Studied Data Structures & Algorithms, OOP, DBMS, OS, and Software Engineering.',
      'Built a solid foundation in Full Stack Web Development throughout 3 years.',
      'Earned Top Performer certifications in Java and DSA from Coding Ninjas.',
      'Worked on academic projects using PHP, MySQL, Java, and JavaScript.',
    ],
    tags: ['DSA', 'OOP', 'DBMS', 'SDLC', 'Networking'],
  },
  {
    company: 'RK Government School, Latehar',
    role: 'Higher Secondary Education (Science)',
    date: '2020 – 2022',
    location: '📍 Latehar, Jharkhand',
    dotStyle: {
      background: 'linear-gradient(135deg, #3B6D11, #639922)',
      boxShadow: '0 0 0 3px rgba(99, 153, 34, 0.2)',
    },
    bullets: [
      'Completed Higher Secondary with Science stream, building analytical foundations.',
    ],
    tags: [],
  },
];

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Experience() {
  return (
    <main className="experience-page section-wrapper">
      <motion.p className="section-label" {...FADE(0.1)}>Journey</motion.p>
      <motion.h1 className="section-title" {...FADE(0.2)}>
        Training &amp; <br />
        <span style={{ color: 'var(--color-gold)' }}>Experience</span>
      </motion.h1>
      <motion.p className="experience-intro" {...FADE(0.3)}>
        Hands-on industry training across PHP, MySQL, Java, and Oracle — plus
        a BCA degree that gave me the computer science foundations to build real software.
      </motion.p>

      <Timeline items={EXPERIENCE} />

      <div className="experience-section">
        <motion.p className="section-label" {...FADE(0.1)}>Education</motion.p>
        <motion.h2
          className="section-title"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          {...FADE(0.2)}
        >
          Academic <span style={{ color: 'var(--color-sky)' }}>Background</span>
        </motion.h2>
        <Timeline items={EDUCATION} />
      </div>

      <motion.div
        className="experience-cta glass-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="experience-cta__content">
          <h3 className="experience-cta__title">Seeking Entry-Level Opportunities</h3>
          <p className="experience-cta__desc">
            I am actively looking for a Software Engineer role where I can apply
            my MERN stack, Java, and database skills to build meaningful products.
          </p>
        </div>
        <a href="mailto:ankitraj829206@gmail.com" className="btn btn-primary">
          Get in Touch →
        </a>
      </motion.div>
    </main>
  );
}