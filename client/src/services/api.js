import axios from 'axios';

// Get API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Format error message
    const message = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', {
      endpoint: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message
    });
    return Promise.reject(new Error(message));
  }
);

// Task-related API calls
export const taskAPI = {
  /**
   * Get all tasks
   * @returns {Promise<Array>} Array of tasks
   */
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task data to create
   * @returns {Promise<Object>} Created task
   */
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} Updated task
   */
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {Promise<void>}
   */
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },

  /**
   * Toggle task completion status
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Updated task
   */
  toggleTaskStatus: async (id) => {
    const response = await api.put(`/tasks/${id}/toggle`);
    return response.data;
  }
};

export default taskAPI; 