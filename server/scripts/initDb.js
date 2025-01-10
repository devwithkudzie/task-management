require('dotenv').config();
const { Client } = require('pg');

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT
} = process.env;

async function createDatabase() {
  // Connect to postgres database to create new database
  const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: 'postgres' // Connect to default postgres database
  });

  try {
    await client.connect();
    
    // Check if database exists
    const checkDb = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (checkDb.rows.length === 0) {
      // Create database if it doesn't exist
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database ${DB_NAME} created successfully`);
    } else {
      console.log(`Database ${DB_NAME} already exists`);
    }

  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run if this script is called directly
if (require.main === module) {
  createDatabase()
    .then(() => {
      console.log('Database initialization completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}

module.exports = createDatabase; 