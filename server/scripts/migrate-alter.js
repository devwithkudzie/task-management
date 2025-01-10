const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function alterTable() {
  try {
    // Add new columns if they don't exist
    await pool.query(`
      DO $$ 
      BEGIN 
        BEGIN
          ALTER TABLE tasks 
            ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'medium',
            ADD COLUMN IF NOT EXISTS category VARCHAR(100),
            ADD COLUMN IF NOT EXISTS due_date TIMESTAMP;
        EXCEPTION 
          WHEN duplicate_column THEN 
            RAISE NOTICE 'columns already exist';
        END;
      END $$;
    `);
    console.log('Table altered successfully');

  } catch (error) {
    console.error('Alter table failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

alterTable()
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 