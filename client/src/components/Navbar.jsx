// src/components/Navbar.jsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  // scroll effect for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = LINKS.map((l) => document.getElementById(l.id));
      const offset = window.innerHeight * 0.25;

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= offset + 40 && rect.bottom >= offset) {
          setActive(section.id);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const isMobile = window.innerWidth <= 1023;
      const offset = isMobile ? 78 : 96;
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);

      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar__inner">

        {/* Logo */}
        <button
          type="button"
          className="navbar__brand"
          onClick={() => scrollToSection('home')}
        >
          <div className="navbar__brand-mark">
            <div className="navbar__brand-glow" />
            <img src="/logo.jpeg" alt="Ankit Kumar" className="navbar__brand-logo" />
            <svg viewBox="0 0 46 46" fill="none" className="navbar__brand-ring">
              <circle cx="23" cy="23" r="21" stroke="url(#logoRing)" strokeWidth="1.5" strokeDasharray="5 3" strokeLinecap="round" />
              <defs>
                <linearGradient id="logoRing" x1="0" y1="0" x2="46" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFD372" />
                  <stop offset="50%" stopColor="#F15B42" />
                  <stop offset="100%" stopColor="#F49CC4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="navbar__brand-copy">
            <span className="navbar__brand-name">Ankit Kumar</span>
            <span className="navbar__brand-role">Full Stack Dev</span>
          </div>
        </button>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                type="button"
                className={`navbar__link ${active === id ? 'navbar__link--active' : ''}`}
                onClick={() => scrollToSection(id)}
                aria-current={active === id ? 'page' : undefined}
              >
                {label}

                {active === id && (
                  <motion.span
                    className="navbar__link-indicator"
                    layoutId="nav-indicator"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <a
           href="/Ankit_BCA2025.pdf"
           download="Ankit_Kumar_Resume.pdf"
           target="_blank"
           rel="noopener noreferrer"
           className="navbar__resume-btn"
        >
          Resume ↓
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {LINKS.map(({ label, id }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  type="button"
                  className={`navbar__mobile-link ${active === id ? 'active' : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

