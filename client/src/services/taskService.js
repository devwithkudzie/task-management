import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  // Get single task by ID
  getTaskById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task');
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  }
};

export default taskService; 