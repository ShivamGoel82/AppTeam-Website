const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure 'cors' is installed (npm install cors)
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // Loads environment variables from .env file

const app = express();
app.set('trust proxy', true); // Essential if deployed behind a proxy like Vercel

// Security Middleware
app.use(helmet());

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter); // Apply to all /api routes

// CORS Configuration - ***THIS IS THE CRITICAL FIX FOR YOUR ERROR***
// In development, we allow all origins ('*') to prevent CORS issues.
// In production, it remains restricted to your Vercel deployment domains for security.
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://appteamwebsite.vercel.app', 'https://appteam-nith.vercel.app']
    // For local development, explicitly use '*' to allow any local frontend port.
    // This is the most reliable way to avoid 'Access-Control-Allow-Origin' errors locally.
    // IMPORTANT: NEVER use '*' in production for security reasons.
    : '*',
  credentials: true // Allow cookies, authorization headers, etc.
}));

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' })); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // To parse URL-encoded request bodies


// MongoDB Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ MONGODB_URI is not defined in environment variables.');
      process.exit(1); // Exit if URI is not found, as database connection is essential
    }
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); // Exit process with failure if unable to connect to MongoDB
  }
};
connectDB(); // Initiate the database connection when the server starts


// API Routes
// These routes must match the fetch requests from your frontend
app.use('/api/contact', require('./routes/contact'));
app.use('/api/team', require('./routes/team'));
app.use('/api/admin', require('./routes/admin')); // Make sure this route is also defined if used
app.use('/api/members', require('./routes/members'));
app.use('/api/announcements', require('./routes/announcements'));

// Health Check Endpoint (useful for monitoring server status)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 Route for API Endpoints (handles requests to /api/* that don't match other routes)
// This is separate from frontend 404s handled by React Router
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found' });
});

// Global Error Handler Middleware
// Catches errors thrown by other middleware or route handlers
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging
  res.status(err.statusCode || 500).json({ // Send appropriate status code
    success: false,
    message: err.message || 'Something went wrong on the server.'
  });
});

// Server Listening
const PORT = process.env.PORT || 5000; // Use port from environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
