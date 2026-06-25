// server/models/ContactMessage.js

import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2,  'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3,   'Subject must be at least 3 characters'],
      maxlength: [150, 'Subject cannot exceed 150 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10,   'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    toJSON: { virtuals: true },
  }
);

// Index for faster queries
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ createdAt: -1 });

// Virtual: formatted date string
contactMessageSchema.virtual('formattedDate').get(function () {
  return this.createdAt?.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
