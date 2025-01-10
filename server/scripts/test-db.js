require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres' // Connect to default database first
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL');
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('PostgreSQL version:', result.rows[0].version);
    
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection(); 