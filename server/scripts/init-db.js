require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres' // Connect to default database
});

async function initializeDatabase() {
  try {
    // Check if database exists
    const result = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    // Create database if it doesn't exist
    if (result.rows.length === 0) {
      // Disconnect all users first
      await pool.query(`
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = $1
        AND pid <> pg_backend_pid()
      `, [process.env.DB_NAME]);

      await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    }

  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  initializeDatabase()
    .then(() => console.log('Database initialization completed'))
    .catch(error => {
      console.error('Failed to initialize database:', error);
      process.exit(1);
    });
}

module.exports = initializeDatabase; 