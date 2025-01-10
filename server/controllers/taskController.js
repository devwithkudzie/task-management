const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const task = await Task.findByPk(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle task status
exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 