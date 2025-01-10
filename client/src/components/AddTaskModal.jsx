import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useTheme
} from '@mui/material';
import { useTasks } from '../context/TaskContext';

const AddTaskModal = ({ open, onClose, taskToEdit = null }) => {
  const theme = useTheme();
  const { addTask, updateTask, categories } = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState(categories[0]);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setCategory(taskToEdit.category || categories[0]);
      setDueDate(taskToEdit.dueDate || '');
    }
  }, [taskToEdit, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      status: taskToEdit?.status || 'pending',
      priority,
      category,
      dueDate,
      createdAt: taskToEdit?.createdAt || new Date().toISOString()
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask({ ...taskData, id: Date.now() });
    }

    // Reset form
    setTitle('');
    setPriority('medium');
    setCategory(categories[0]);
    setDueDate('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setPriority('medium');
    setCategory(categories[0]);
    setDueDate('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 24,
        sx: {
          borderRadius: 2
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {taskToEdit ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              label="Task Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              variant="outlined"
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split('T')[0]
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={!title.trim()}
          >
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTaskModal; 