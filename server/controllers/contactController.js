// server/controllers/contactController.js

import { validationResult } from 'express-validator';
import nodemailer            from 'nodemailer';
import ContactMessage        from '../models/ContactMessage.js';

/* ─── Optional email transport ─────────────────────────────────── */
function createTransport() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendNotificationEmail(msg) {
  const transporter = createTransport();
  if (!transporter) return; // email not configured — skip silently

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#F15B42">📬 New Portfolio Contact</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;font-weight:600;color:#555">Name</td>   <td style="padding:8px">${msg.name}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Email</td>  <td style="padding:8px"><a href="mailto:${msg.email}">${msg.email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">Subject</td><td style="padding:8px">${msg.subject}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${msg.message}</td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">Sent At</td><td style="padding:8px">${new Date().toLocaleString('en-IN')}</td></tr>
      </table>
      <p style="margin-top:20px;color:#888;font-size:12px">This message was submitted via your portfolio contact form.</p>
    </div>
  `;

  await transporter.sendMail({
    from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to:      process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject: `[Portfolio] ${msg.subject}`,
    html,
  });
}

/* ─── POST /api/contact ─────────────────────────────────────────── */
export async function createContactMessage(req, res) {
  // Validate
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors:  errs.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    // Persist to MongoDB
    const doc = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] ?? null,
    });

    // Fire-and-forget email notification
    sendNotificationEmail(doc).catch((err) =>
      console.warn('[Email] Notification failed:', err.message)
    );

    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out! I'll get back to you soon.",
      data: {
        id:        doc._id,
        name:      doc.name,
        createdAt: doc.createdAt,
      },
    });
  } catch (err) {
    console.error('[Contact] DB error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
}

/* ─── GET /api/contact ──────────────────────────────────────────── */
export async function getAllMessages(req, res) {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-ipAddress -userAgent -__v'),
      ContactMessage.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        messages,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    console.error('[Contact] Fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

/* ─── PATCH /api/contact/:id/read ──────────────────────────────── */
export async function markAsRead(req, res) {
  try {
    const doc = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true, select: '-ipAddress -userAgent -__v' }
    );
    if (!doc) return res.status(404).json({ success: false, message: 'Message not found.' });
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

/* ─── DELETE /api/contact/:id ──────────────────────────────────── */
export async function deleteMessage(req, res) {
  try {
    const doc = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Message not found.' });
    return res.status(200).json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
