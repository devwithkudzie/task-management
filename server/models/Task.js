const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

class Task {
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT 
        id,
        title,
        description,
        status,
        priority,
        category,
        due_date as "dueDate",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM tasks 
      ORDER BY created_at DESC
    `);
    return rows;
  }

  static async create(data) {
    const { title, description, status = 'pending', priority = 'medium', category, dueDate } = data;
    
    try {
      const { rows } = await pool.query(
        `INSERT INTO tasks 
          (title, description, status, priority, category, due_date) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING 
          id,
          title,
          description,
          status,
          priority,
          category,
          due_date as "dueDate",
          created_at as "createdAt",
          updated_at as "updatedAt"`,
        [title, description, status, priority, category, dueDate]
      );
      
      return rows[0];
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task: ' + error.message);
    }
  }

  static async update(id, data) {
    const { title, description, status, priority, category, dueDate } = data;
    
    try {
      const { rows } = await pool.query(
        `UPDATE tasks 
         SET 
          title = $1,
          description = $2,
          status = $3,
          priority = $4,
          category = $5,
          due_date = $6,
          updated_at = CURRENT_TIMESTAMP
         WHERE id = $7 
         RETURNING 
          id,
          title,
          description,
          status,
          priority,
          category,
          due_date as "dueDate",
          created_at as "createdAt",
          updated_at as "updatedAt"`,
        [title, description, status, priority, category, dueDate, id]
      );
      
      return rows[0];
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task: ' + error.message);
    }
  }

  static async toggleStatus(id) {
    try {
      const { rows } = await pool.query(
        `UPDATE tasks 
         SET 
          status = CASE WHEN status = 'completed' THEN 'pending' ELSE 'completed' END,
          updated_at = CURRENT_TIMESTAMP
         WHERE id = $1 
         RETURNING 
          id,
          title,
          description,
          status,
          priority,
          category,
          due_date as "dueDate",
          created_at as "createdAt",
          updated_at as "updatedAt"`,
        [id]
      );
      
      return rows[0];
    } catch (error) {
      console.error('Error toggling task status:', error);
      throw new Error('Failed to toggle task status: ' + error.message);
    }
  }
}

module.exports = Task; 