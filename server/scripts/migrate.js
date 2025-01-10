const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function migrate() {
  try {
    // Drop existing table if it exists
    await pool.query(`DROP TABLE IF EXISTS tasks CASCADE;`);
    console.log('Dropped existing tasks table');

    // Create tasks table with new schema
    await pool.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(50) DEFAULT 'medium',
        category VARCHAR(100),
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created new tasks table');

    // Insert sample data
    const sampleTasks = [
      {
        title: 'Complete Project Setup',
        description: 'Set up the initial project structure and dependencies',
        status: 'completed',
        priority: 'high',
        category: 'Work',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Database Design',
        description: 'Create database schema and relationships',
        status: 'pending',
        priority: 'medium',
        category: 'Development',
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    ];

    // Insert each sample task
    for (const task of sampleTasks) {
      await pool.query(
        `INSERT INTO tasks 
          (title, description, status, priority, category, due_date) 
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [task.title, task.description, task.status, task.priority, task.category, task.due_date]
      );
    }
    console.log('Inserted sample tasks');

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error; // Re-throw to ensure process exits with error
  } finally {
    await pool.end();
  }
}

// Run migration and handle errors
migrate()
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 