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
  useTheme,
  Typography
} from '@mui/material';
import { useTasks } from '../context/TaskContext';

/**
 * Task form component for creating and editing tasks
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls dialog visibility
 * @param {Function} props.onClose - Handler for dialog close
 * @param {Object} [props.taskToEdit] - Task object when editing (null for create)
 */
const TaskForm = ({ open, onClose, taskToEdit = null }) => {
  // Theme and task context
  const theme = useTheme();
  const { addTask, updateTask, categories } = useTasks();

  // Initialize form state
  const initialFormState = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: '',
    dueDate: null
  };

  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Update form when editing a task
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        category: taskToEdit.category || '',
        dueDate: taskToEdit.dueDate || null
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [taskToEdit, open]);

  /**
   * Validates form data
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, formData);
      } else {
        await addTask({
          ...formData,
          id: Date.now(), // Temporary ID for new tasks
          createdAt: new Date().toISOString()
        });
      }
      handleClose();
    } catch (error) {
      console.error('Error saving task:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save task. Please try again.'
      }));
    }
  };

  /**
   * Handles form field changes
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Resets form and closes dialog
   */
  const handleClose = () => {
    setFormData(initialFormState);
    setErrors({});
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
        sx: { borderRadius: 2 }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {taskToEdit ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Title field */}
            <TextField
              autoFocus
              name="title"
              label="Task Title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
            />

            {/* Description field */}
            <TextField
              name="description"
              label="Description"
              multiline
              rows={3}
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />

            {/* Priority and Category selectors */}
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Due date picker */}
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              value={formData.dueDate || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 
                min: new Date().toISOString().split('T')[0]
              }}
            />

            {/* General error message */}
            {errors.submit && (
              <Typography color="error" variant="body2">
                {errors.submit}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        {/* Form actions */}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={!formData.title.trim()}
          >
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm; 