// server/server.js

import 'dotenv/config';
import express      from 'express';
import cors         from 'cors';
import helmet       from 'helmet';
import morgan       from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose     from 'mongoose';

import contactRoutes           from './routes/contactRoutes.js';
import { contactLimiter, apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler }     from './middleware/errorHandler.js';

const app  = express();
const PORT = process.env.PORT || 5000;

/* ─── MongoDB Connection ───────────────────────────────────────── */
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'ankit_portfolio',
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
}

/* ─── Security Middleware ──────────────────────────────────────── */
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

/* ─── Body Parsing ─────────────────────────────────────────────── */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* ─── NoSQL Injection Sanitization ────────────────────────────── */
app.use(mongoSanitize());

/* ─── Request Logging ──────────────────────────────────────────── */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* ─── Global Rate Limiter ──────────────────────────────────────── */
app.use('/api', apiLimiter);

/* ─── Health Check ─────────────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ankit Kumar Portfolio API is running.',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

/* ─── API Routes ───────────────────────────────────────────────── */
app.use('/api/contact', contactLimiter, contactRoutes);

/* ─── 404 & Error Handlers ─────────────────────────────────────── */
app.use(notFound);
app.use(errorHandler);

/* ─── Start Server ─────────────────────────────────────────────── */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀  Server running on http://localhost:${PORT}`);
    console.log(`📬  Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`💚  Health:      http://localhost:${PORT}/api/health`);
  });
});

/* ─── Graceful Shutdown ────────────────────────────────────────── */
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing server...');
  await mongoose.connection.close();
  process.exit(0);
});

export default app;
