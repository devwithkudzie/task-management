const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// Create a task
router.post('/', async (req, res, next) => {
  try {
    // Validate required fields
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error('Route error creating task:', error);
    next(error);
  }
});

// Update a task
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.update(id, req.body);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Toggle task status
router.put('/:id/toggle', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.toggleStatus(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 