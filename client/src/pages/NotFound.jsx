// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found</title></Helmet>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          gap: '1.5rem',
        }}
      >
        <motion.h1
          style={{
            fontFamily: 'var(--ff-head)',
            fontSize: 'clamp(5rem, 18vw, 10rem)',
            fontWeight: 800,
            background: 'var(--grad-hero)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          404
        </motion.h1>
        <motion.p
          style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Oops — this page doesn't exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Link to="/" className="btn btn-primary">← Back to Home</Link>
        </motion.div>
      </div>
    </>
  );
}
