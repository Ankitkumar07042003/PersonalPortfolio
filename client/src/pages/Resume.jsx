// src/pages/Resume.jsx

import { motion } from 'framer-motion';
import './Resume.css';

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const SKILLS = {
  Languages:           ['Java', 'JavaScript (ES6+)', 'PHP', 'SQL'],
  Frontend:            ['HTML5', 'CSS3', 'React.js', 'Redux', 'Redux Toolkit', 'Tailwind CSS'],
  'Backend & APIs':    ['Node.js', 'Express.js', 'PHP', 'RESTful APIs', 'API Integration'],
  Databases:           ['MySQL', 'MongoDB', 'Oracle SQL', 'Database Design', 'Query Optimization'],
  DSA:                 ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs'],
  'Software Eng.':     ['OOP', 'MVC Architecture', 'SDLC', 'Debugging', 'Technical Documentation'],
  'Tools & Practices': ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Agile', 'Version Control'],
};

const EXPERIENCE = [
  {
    company:  'Nexgen Technology Pvt. Ltd.',
    role:     'On-Job Training — PHP & MySQL',
    date:     'Dec 2025 – Jan 2026',
    location: 'Ranchi, Jharkhand',
    bullets: [
      'Built dynamic web applications using PHP and MySQL.',
      'Designed relational database schemas and optimized SQL queries.',
      'Implemented CRUD operations following MVC architecture principles.',
      'Developed backend business logic, validation workflows, and DB integration modules.',
      'Participated in debugging, testing, and application enhancement activities.',
    ],
  },
  {
    company:  'Launcher Education Pvt. Ltd.',
    role:     'On-Job Training — Java & Oracle',
    date:     'Oct 2025 – Nov 2025',
    location: 'Ranchi, Jharkhand',
    bullets: [
      'Developed Java applications using Object-Oriented Programming principles.',
      'Worked with Oracle SQL — joins, stored procedures, and database operations.',
      'Implemented exception handling and Java Collections Framework.',
      'Strengthened analytical problem-solving through practical coding assignments.',
      'Collaborated on structured software development and technical documentation.',
    ],
  },
];

const EDUCATION = [
  {
    degree:   'Bachelor of Computer Applications (BCA)',
    school:   'Doranda College, Ranchi University',
    date:     '2022 – 2025',
    location: 'Ranchi, Jharkhand',
  },
  {
    degree:   'Higher Secondary Education',
    school:   'RK Government School',
    date:     '2020 – 2022',
    location: 'Latehar, Jharkhand',
  },
];

const CERTS = [
  { title: 'Certificate of Excellence — Data Structures in Java (Top Performer)', org: 'Coding Ninjas' },
  { title: 'Certificate of Excellence — Introduction to Java (Top Performer)',    org: 'Coding Ninjas' },
  { title: 'On-Job Training Certificate — PHP & MySQL',                           org: 'Nexgen Technology Pvt. Ltd.' },
  { title: 'On-Job Training Certificate — Java & Oracle',                         org: 'Launcher Education Pvt. Ltd.' },
];

export default function Resume() {
  return (
    <main className="resume-page section-wrapper">

      {/* Page header */}
      <div className="resume-page-header">
        <div>
          <motion.p className="section-label" {...FADE(0.1)}>Curriculum Vitae</motion.p>
          <motion.h1 className="section-title" {...FADE(0.2)}>
            My <span style={{ color: 'var(--color-gold)' }}>Resume</span>
          </motion.h1>
        </div>
        <motion.a
          href="/Ankit_BCA2025.pdf"
          download="Ankit_Kumar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary resume-download-btn"
          {...FADE(0.3)}
        >
          ↓ Download PDF
        </motion.a>
      </div>

      {/* Resume card */}
      <motion.div
        className="resume-card glass-card"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* HEADER */}
        <div className="rc-header">
          <div className="rc-avatar">
            <img
              src="/logo.jpeg"
              alt="Ankit Kumar"
              style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }}
            />
          </div>
          <div className="rc-header-info">
            <h2 className="rc-name">Ankit Kumar</h2>
            <p className="rc-title">Full Stack Developer · MERN · Java · PHP</p>
            <div className="rc-contacts">
              <a href="mailto:ankitraj829206@gmail.com" className="rc-contact-item">📧 ankitraj829206@gmail.com</a>
              <a href="tel:+917781805890"               className="rc-contact-item">📱 +91 7781805890</a>
              <span                                     className="rc-contact-item">📍 Ranchi, Jharkhand, India</span>
              <a href="https://linkedin.com/in/ankit-kumar-gupta-0149a125b" target="_blank" rel="noopener noreferrer" className="rc-contact-item">💼 LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="rc-divider" />

        {/* SUMMARY */}
        <section className="rc-section">
          <h3 className="rc-section-title">👤 Professional Summary</h3>
          <p className="rc-summary">
            Results-driven BCA graduate with hands-on training experience in Full Stack Web
            Development, Java, PHP, MySQL, and modern JavaScript technologies. Strong foundation
            in Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management
            Systems, and SDLC. Experienced in building responsive web applications using React.js,
            Node.js, Express.js, MongoDB, and MySQL. Seeking an entry-level Software Engineer role
            to contribute technical expertise and software development skills.
          </p>
        </section>

        <div className="rc-divider" />

        {/* SKILLS */}
        <section className="rc-section">
          <h3 className="rc-section-title">⚡ Technical Skills</h3>
          <div className="rc-skills-grid">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="rc-skill-row">
                <span className="rc-skill-category">{category}</span>
                <div className="rc-skill-tags">
                  {items.map((s) => (
                    <span key={s} className="rc-skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="rc-divider" />

        {/* EXPERIENCE */}
        <section className="rc-section">
          <h3 className="rc-section-title">💼 Training &amp; Internship Experience</h3>
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              className="rc-exp-block"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="rc-exp-header">
                <div>
                  <h4 className="rc-exp-company">{exp.company}</h4>
                  <p className="rc-exp-role">{exp.role}</p>
                </div>
                <div className="rc-exp-meta">
                  <span className="rc-exp-date">{exp.date}</span>
                  <span className="rc-exp-location">{exp.location}</span>
                </div>
              </div>
              <ul className="rc-exp-bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j}><span className="rc-bullet-dot" />{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        <div className="rc-divider" />

        {/* EDUCATION */}
        <section className="rc-section">
          <h3 className="rc-section-title">🎓 Education</h3>
          {EDUCATION.map((edu, i) => (
            <div key={i} className="rc-edu-block">
              <div className="rc-exp-header">
                <div>
                  <h4 className="rc-exp-company">{edu.degree}</h4>
                  <p className="rc-exp-role">{edu.school}</p>
                </div>
                <div className="rc-exp-meta">
                  <span className="rc-exp-date">{edu.date}</span>
                  <span className="rc-exp-location">{edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="rc-divider" />

        {/* CERTIFICATIONS */}
        <section className="rc-section">
          <h3 className="rc-section-title">🏆 Certifications</h3>
          <div className="rc-cert-grid">
            {CERTS.map((c, i) => (
              <div key={i} className="rc-cert-card">
                <span className="rc-bullet-dot" style={{ marginTop:'0.3rem', flexShrink:0 }} />
                <div>
                  <p className="rc-cert-title">{c.title}</p>
                  <p className="rc-cert-org">{c.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="rc-divider" />

        {/* LANGUAGES */}
        <section className="rc-section rc-section--row">
          <h3 className="rc-section-title" style={{ marginBottom:0 }}>🌐 Languages</h3>
          <div className="rc-lang-row">
            <div className="rc-lang-item">
              <span className="rc-lang-name">Hindi</span>
              <span className="badge badge-gold">Native</span>
            </div>
            <div className="rc-lang-item">
              <span className="rc-lang-name">English</span>
              <span className="badge badge-sky">Professional Working</span>
            </div>
          </div>
        </section>

      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="resume-bottom-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a
        href="/Ankit_BCA2025.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        >
        Download PDF Resume
        </a>
      </motion.div>

    </main>
  );
}