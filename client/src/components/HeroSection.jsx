// src/components/HeroSection.jsx

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import Scene from '../three/Scene';
import './HeroSection.css';

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      {/* 3D Canvas */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Content */}
      <div className="hero__content container">
        <motion.p className="hero__eyebrow" {...FADE_UP(0.2)}>
          👋 Hello, World!
        </motion.p>

        <motion.h1 className="hero__name" {...FADE_UP(0.4)}>
          Ankit<br />
          <span className="gradient-text">Kumar</span>
        </motion.h1>

        <motion.p className="hero__role" {...FADE_UP(0.6)}>
          Full Stack Developer &amp;{' '}
          <span className="hero__typed">
            <TypeAnimation
              sequence={[
                'MERN Stack Engineer', 2000,
                'Java Enthusiast',     2000,
                'Problem Solver',      2000,
                'REST API Builder',    2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.p>

        <motion.p className="hero__bio" {...FADE_UP(0.8)}>
          BCA graduate from Ranchi, passionate about building scalable, clean,
          and impactful software. Skilled in MERN, Java, PHP, MySQL, and
          REST APIs — turning ideas into production-ready applications.
        </motion.p>

        <motion.div className="hero__btns" {...FADE_UP(1.0)}>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects →
          </button>
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Connect
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div className="hero__stats" {...FADE_UP(1.2)}>
          {[
            { num: '3+', label: 'Years Learning' },
            { num: '4+', label: 'Certifications' },
            { num: '10+', label: 'Technologies' },
            { num: '2',   label: 'Internships' },
          ].map(({ num, label }) => (
            <div key={label} className="hero__stat">
              <span className="hero__stat-num gradient-text-gold">{num}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="hero__scroll-text">SCROLL</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
