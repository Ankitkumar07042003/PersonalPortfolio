// src/pages/Projects.jsx

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack shopping application with React frontend, Node.js/Express backend, MongoDB database, JWT authentication, cart management, and order tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Express', 'JWT'],
    github: 'https://github.com/',
    live: '#',
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, rgba(255,211,114,.12), rgba(241,91,66,.1))',
    category: 'Full Stack',
    cat: 'fullstack',
  },
  {
    id: 2,
    title: 'Student Management System',
    description:
      'PHP & MySQL web application for managing student records with full CRUD operations, MVC architecture, role-based access, and optimized SQL queries.',
    tags: ['PHP', 'MySQL', 'MVC', 'HTML5', 'CSS3', 'CRUD'],
    github: 'https://github.com/',
    emoji: '🗄',
    gradient: 'linear-gradient(135deg, rgba(124,170,220,.1), rgba(44,61,115,.15))',
    category: 'Backend',
    cat: 'backend',
  },
  {
    id: 3,
    title: 'Bank Account Manager',
    description:
      'Java console application demonstrating OOP — inheritance, polymorphism, exception handling, Java Collections, and clean domain modeling.',
    tags: ['Java', 'OOP', 'Collections', 'Exception Handling'],
    github: 'https://github.com/',
    emoji: '☕',
    gradient: 'linear-gradient(135deg, rgba(244,156,196,.1), rgba(241,91,66,.08))',
    category: 'Java',
    cat: 'java',
  },
  {
    id: 4,
    title: 'Task Manager REST API',
    description:
      'RESTful API built with Express.js and MongoDB featuring JWT auth, CRUD endpoints, input validation with express-validator, and Postman-documented routes.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API', 'Postman'],
    github: 'https://github.com/',
    live: '#',
    emoji: '📝',
    gradient: 'linear-gradient(135deg, rgba(255,211,114,.08), rgba(124,170,220,.1))',
    category: 'Full Stack',
    cat: 'fullstack',
  },
  {
    id: 5,
    title: 'Inventory Management System',
    description:
      'PHP & Oracle SQL web application with optimized complex queries, stored procedures, inventory tracking, and business logic workflows.',
    tags: ['PHP', 'Oracle SQL', 'Stored Procedures', 'MVC'],
    github: 'https://github.com/',
    emoji: '🏪',
    gradient: 'linear-gradient(135deg, rgba(29,158,117,.08), rgba(44,61,115,.12))',
    category: 'Backend',
    cat: 'backend',
  },
  {
    id: 6,
    title: 'Real-time Chat Application',
    description:
      'MERN stack chat app with Socket.io for real-time messaging, user authentication, room management, and a responsive React UI.',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/',
    live: '#',
    emoji: '💬',
    gradient: 'linear-gradient(135deg, rgba(241,91,66,.1), rgba(244,156,196,.1))',
    category: 'Full Stack',
    cat: 'fullstack',
  },
];

const FILTERS = [
  { label: 'All',        value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Backend',    value: 'backend' },
  { label: 'Java',       value: 'java' },
];

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === active);

  return (
    <>
      <Helmet>
        <title>Projects — Ankit Kumar</title>
        <meta
          name="description"
          content="Explore Ankit Kumar's projects — MERN stack apps, PHP/MySQL systems, Java applications, and REST APIs."
        />
      </Helmet>

      <main className="projects-page section-wrapper">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Work
        </motion.p>
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured <br />
          <span style={{ color: 'var(--color-pink)' }}>Projects</span>
        </motion.h1>

        <motion.p
          className="projects-intro"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          A collection of projects built across Full Stack (MERN), PHP/MySQL
          backends, and Java applications — each reflecting real-world
          engineering practices.
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          className="projects-filter"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              className={`projects-filter__btn ${active === value ? 'active' : ''}`}
              onClick={() => setActive(value)}
            >
              {label}
              <span className="projects-filter__count">
                {value === 'all'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.cat === value).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>More projects on GitHub →</p>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View GitHub Profile
          </a>
        </motion.div>
      </main>
    </>
  );
}
