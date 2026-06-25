// server/routes/contactRoutes.js

import { Router }         from 'express';
import { body }           from 'express-validator';
import {
  createContactMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contactController.js';

const router = Router();

/* ─── Validation rules ─────────────────────────────────────────── */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()  .withMessage('Name is required.')
    .isLength({ min: 2, max: 80 })
                 .withMessage('Name must be between 2 and 80 characters.'),

  body('email')
    .trim()
    .notEmpty()  .withMessage('Email is required.')
    .isEmail()   .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty()  .withMessage('Subject is required.')
    .isLength({ min: 3, max: 150 })
                 .withMessage('Subject must be between 3 and 150 characters.'),

  body('message')
    .trim()
    .notEmpty()  .withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 })
                 .withMessage('Message must be between 10 and 2000 characters.'),
];

/* ─── Routes ───────────────────────────────────────────────────── */

// Public
router.post('/',   contactValidation, createContactMessage);

// Admin (protect with auth middleware in production)
router.get('/',                 getAllMessages);
router.patch('/:id/read',       markAsRead);
router.delete('/:id',           deleteMessage);

export default router;
