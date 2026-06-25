// src/pages/About.jsx

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SkillsGrid from '../components/SkillsGrid';
import './About.css';

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

const CERTS = [
  {
    icon: '🏆',
    title: 'Certificate of Excellence — Data Structures in Java',
    org: 'Coding Ninjas · Top Performer',
  },
  {
    icon: '⭐',
    title: 'Certificate of Excellence — Introduction to Java',
    org: 'Coding Ninjas · Top Performer',
  },
  {
    icon: '🛠',
    title: 'On-Job Training Certificate — PHP & MySQL',
    org: 'Nexgen Technology Pvt. Ltd.',
  },
  {
    icon: '☕',
    title: 'On-Job Training Certificate — Java & Oracle',
    org: 'Launcher Education Pvt. Ltd.',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Ankit Kumar</title>
        <meta
          name="description"
          content="Learn about Ankit Kumar — BCA graduate, Full Stack Developer, and passionate software engineer from Ranchi, India."
        />
      </Helmet>

      <main className="about-page section-wrapper">
        {/* Header */}
        <motion.p className="section-label" {...FADE(0.1)}>
          About Me
        </motion.p>
        <motion.h1 className="section-title" {...FADE(0.2)}>
          Crafting Digital <br />
          <span style={{ color: 'var(--color-sky)' }}>Experiences</span>
        </motion.h1>

        {/* Bio + Avatar grid */}
        <div className="about-grid">
          <motion.div className="about-left" {...FADE(0.3)}>
            {/* Logo image instead of AK initials */}
          <img
            src="/image.jpeg"
            alt="Ankit Kumar"
            style={{
              width:'600px',
              height:'460px',
              objectFit:'contain',
              position:'relative',
              zIndex:1,
              borderRadius:'40%',
            }}
          />

            <div className="about-langs">
              {['Hindi (Native)', 'English (Professional)'].map((l) => (
                <span key={l} className="skill-tag">{l}</span>
              ))}
            </div>

            <div className="about-contact-links">
              <a
                href="mailto:ankitraj829206@gmail.com"
                className="about-contact-item"
              >
                <span>📧</span>
                <span>ankitraj829206@gmail.com</span>
              </a>
              <a href="tel:+917781805890" className="about-contact-item">
                <span>📱</span>
                <span>+91 7781805890</span>
              </a>
              <span className="about-contact-item">
                <span>📍</span>
                <span>Ranchi, Jharkhand, India</span>
              </span>
            </div>
          </motion.div>

          <motion.div className="about-right" {...FADE(0.4)}>
            <p className="about-bio">
              I'm a BCA graduate from{' '}
              <strong>Doranda College, Ranchi University</strong> (2022–2025),
              passionate about building scalable, clean, and impactful software.
              My journey started with a deep curiosity about how software works,
              which led me to master Full Stack Development across Java, PHP,
              JavaScript, and modern MERN technologies.
            </p>
            <p className="about-bio">
              I've completed hands-on training at{' '}
              <strong>Nexgen Technology</strong> (PHP & MySQL) and{' '}
              <strong>Launcher Education</strong> (Java & Oracle) where I
              worked on real-world applications, database design, and clean
              software architecture. I'm a top performer at Coding Ninjas for
              Data Structures and Java.
            </p>
            <p className="about-bio">
              My goal is to land an entry-level Software Engineer role where I
              can contribute technical skills, learn from experienced mentors,
              and help build products that make a difference.
            </p>

            <div className="about-stats">
              {[
                { num: '3+', label: 'Years of learning' },
                { num: '4+', label: 'Certifications earned' },
                { num: '2',  label: 'Industry internships' },
                { num: '10+', label: 'Technologies mastered' },
              ].map(({ num, label }) => (
                <div key={label} className="about-stat glass-card">
                  <span className="about-stat__num gradient-text-gold">{num}</span>
                  <span className="about-stat__label">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="about-section">
          <motion.p className="section-label" {...FADE(0.1)}>Skills</motion.p>
          <motion.h2
            className="section-title"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            {...FADE(0.2)}
          >
            Technical <span className="gradient-text">Arsenal</span>
          </motion.h2>
          <SkillsGrid />
        </div>

        {/* Certifications */}
        <div className="about-section">
          <motion.p className="section-label" {...FADE(0.1)}>Recognition</motion.p>
          <motion.h2
            className="section-title"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            {...FADE(0.2)}
          >
            Certifications &amp; <span style={{ color: 'var(--color-gold)' }}>Awards</span>
          </motion.h2>

          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <motion.div
                key={c.title}
                className="cert-card glass-card"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="cert-icon">{c.icon}</div>
                <div>
                  <p className="cert-title">{c.title}</p>
                  <p className="cert-org">{c.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
