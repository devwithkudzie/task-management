import { createContext, useContext, useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useSnackbar } from 'notistack';

// Create context for task management
const TaskContext = createContext();

// Predefined categories for tasks
const CATEGORIES = [
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Education',
  'Home'
];

export const TaskProvider = ({ children }) => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetches all tasks from the API
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getTasks();
      setTasks(data);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error fetching tasks', { 
        variant: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new task
   * @param {Object} taskData - The task data to create
   */
  const addTask = async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      enqueueSnackbar('Task created successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error creating task', { 
        variant: 'error' 
      });
      throw error;
    }
  };

  /**
   * Updates an existing task
   * @param {string} id - The task ID
   * @param {Object} taskData - The updated task data
   */
  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskAPI.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
      enqueueSnackbar('Task updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error updating task', { 
        variant: 'error' 
      });
      throw error;
    }
  };

  /**
   * Toggles a task's completion status
   * @param {string} id - The task ID
   */
  const toggleTaskStatus = async (id) => {
    try {
      const updatedTask = await taskAPI.toggleTaskStatus(id);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
      enqueueSnackbar('Task status updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error toggling task status', { 
        variant: 'error' 
      });
      throw error;
    }
  };

  /**
   * Deletes a task
   * @param {string} id - The task ID
   */
  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      enqueueSnackbar('Task deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error deleting task', { 
        variant: 'error' 
      });
    }
  };

  /**
   * Gets statistics about tasks
   * @returns {Object} Task statistics
   */
  const getStats = () => ({
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    priorityTasks: tasks.filter(t => t.priority === 'high').length
  });

  // Provide task context to children
  return (
    <TaskContext.Provider value={{ 
      tasks, 
      loading,
      addTask, 
      updateTask, 
      toggleTaskStatus, 
      deleteTask, 
      getStats,
      categories: CATEGORIES 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

/**
 * Custom hook to use task context
 * @returns {Object} Task context value
 * @throws {Error} If used outside of TaskProvider
 */
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}; 