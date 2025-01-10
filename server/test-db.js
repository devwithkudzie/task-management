const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL');
    await client.release();
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection(); 