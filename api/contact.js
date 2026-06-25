import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';

import contactRoutes from '../server/routes/contactRoutes.js';
import { contactLimiter, apiLimiter } from '../server/middleware/rateLimiter.js';
import { notFound, errorHandler } from '../server/middleware/errorHandler.js';

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use('/api', apiLimiter);
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Portfolio API is running.' });
});
app.use('/api/contact', contactLimiter, contactRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
