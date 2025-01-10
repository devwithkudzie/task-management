require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg');
const requestLogger = require('./middleware/requestLogger');

// Create database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLogger);

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error.message);
    return false;
  }
};

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: dbConnected ? 'healthy' : 'unhealthy',
    timestamp: new Date(),
    dbConnection: dbConnected ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    path: req.path,
    timestamp: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await testConnection();
});

// Handle cleanup
process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

module.exports = { app, pool }; 