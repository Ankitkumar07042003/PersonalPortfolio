// src/pages/Contact.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../utils/api';
import './Contact.css';

const CONTACT_DETAILS = [
  { icon: '📧', label: 'Email',    value: 'ankitraj829206@gmail.com',                   href: 'mailto:ankitraj829206@gmail.com' },
  { icon: '📱', label: 'Phone',    value: '+91 7781805890',                             href: 'tel:+917781805890' },
  { icon: '📍', label: 'Location', value: 'Ranchi, Jharkhand, India',                   href: null },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/ankit-kumar-gupta-0149a125b', href: 'https://linkedin.com/in/ankit-kumar-gupta-0149a125b' },
];

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

function validate(fields) {
  const errors = {};
  if (!fields.name.trim())    errors.name    = 'Name is required.';
  if (!fields.email.trim())   errors.email   = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                              errors.email   = 'Enter a valid email.';
  if (!fields.subject.trim()) errors.subject = 'Subject is required.';
  if (!fields.message.trim()) errors.message = 'Message is required.';
  else if (fields.message.trim().length < 10)
                              errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [fields, setFields]       = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]       = useState({});
  const [status, setStatus]       = useState(null);
  const [serverMsg, setServerMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    setServerMsg('');
    try {
      const res = await sendContactMessage(fields);
      setStatus('success');
      setServerMsg(res.data?.message || "Message sent! I will get back to you soon.");
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setServerMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main className="contact-page section-wrapper">
      <motion.p className="section-label" {...FADE(0.1)}>Get In Touch</motion.p>
      <motion.h1 className="section-title" {...FADE(0.2)}>
        Let us Build <br />
        <span style={{ color: 'var(--color-orange)' }}>Something</span>
      </motion.h1>

      <div className="contact-grid">
        {/* Left — info */}
        <motion.div className="contact-info" {...FADE(0.3)}>
          <p className="contact-info__intro">
            I am actively seeking entry-level Software Engineer opportunities.
            Whether you have a project, a question, or just want to say hello
            — my inbox is always open.
          </p>

          <div className="contact-details">
            {CONTACT_DETAILS.map(({ icon, label, value, href }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-detail">
                  <div className="contact-detail__icon">{icon}</div>
                  <div>
                    <p className="contact-detail__label">{label}</p>
                    <p className="contact-detail__value">{value}</p>
                  </div>
                </a>
              ) : (
                <div key={label} className="contact-detail">
                  <div className="contact-detail__icon">{icon}</div>
                  <div>
                    <p className="contact-detail__label">{label}</p>
                    <p className="contact-detail__value">{value}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="contact-availability">
            <span className="contact-availability__dot" />
            <span>Available for full-time roles and freelance projects</span>
          </div>

          <div className="contact-langs">
            {['Hindi (Native)', 'English (Professional)'].map((l) => (
              <span key={l} className="skill-tag">{l}</span>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div className="contact-form-wrap" {...FADE(0.4)}>
          <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
            <h2 className="contact-form__title">Send a Message</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  id="name" name="name" type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Your name"
                  value={fields.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject" type="text"
                className={`form-input ${errors.subject ? 'error' : ''}`}
                placeholder="Job Opportunity / Collaboration"
                value={fields.subject}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
              {errors.subject && <p className="form-error">{errors.subject}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message" name="message"
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                placeholder="Tell me about the opportunity or project..."
                rows={5}
                value={fields.message}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
              {errors.message && <p className="form-error">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-form__submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <><span className="spinner" /> Sending...</>
              ) : (
                'Send Message'
              )}
            </button>

            {serverMsg && (
              <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status === 'success' ? '✓' : '✕'} {serverMsg}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}