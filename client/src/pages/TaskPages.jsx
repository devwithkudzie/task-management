import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Stack,
  IconButton,
  useTheme,
  alpha,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from '@mui/icons-material';
import { useCustomTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import AddTaskModal from '../components/AddTaskModal';

/**
 * Component to display when no tasks are found
 */
const EmptyState = () => (
  <Box sx={{ textAlign: 'center', py: 4 }}>
    <Typography variant="h6" color="textSecondary" gutterBottom>
      No tasks found
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Add a new task to get started
    </Typography>
  </Box>
);

/**
 * Main task management page component
 */
const TaskPages = () => {
  // Theme hooks
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
  
  // Task context and state
  const { tasks, loading, toggleTaskStatus, deleteTask } = useTasks();
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  /**
   * Modal handlers
   */
  const handleShowModal = () => {
    setTaskToEdit(null);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit(null);
    setShowAddModal(false);
  };

  /**
   * Task action handlers
   */
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowAddModal(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      await toggleTaskStatus(taskId);
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  // Filter tasks based on search and filter criteria
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Main card container */}
      <Card sx={{
        backgroundColor: isDarkMode ? alpha(theme.palette.background.paper, 0.8) : theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
      }}>
        <CardContent>
          {/* Search and Filter Controls */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Search field */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Status filter */}
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Priority filter */}
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <Select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <MenuItem value="all">All Priority</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Add task button */}
            <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleShowModal}
                sx={{ minWidth: 140 }}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>

          {/* Task List */}
          {filteredTasks.length > 0 ? (
            <Stack spacing={2}>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleStatus}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  isDarkMode={isDarkMode}
                />
              ))}
            </Stack>
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Task Modal */}
      <AddTaskModal 
        open={showAddModal}
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
};

/**
 * Individual task card component
 */
const TaskCard = ({ task, onToggle, onEdit, onDelete, isDarkMode }) => {
  const theme = useTheme();

  return (
    <Card sx={{
      backgroundColor: isDarkMode
        ? alpha(theme.palette.background.default, 0.5)
        : theme.palette.background.default,
    }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {/* Task status toggle */}
          <Grid item>
            <IconButton
              onClick={() => onToggle(task.id)}
              color={task.status === 'completed' ? 'success' : 'default'}
            >
              {task.status === 'completed' ? <CheckCircleIcon /> : <UncheckedIcon />}
            </IconButton>
          </Grid>

          {/* Task details */}
          <Grid item xs>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                color: task.status === 'completed' ? 'text.secondary' : 'text.primary',
              }}
            >
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            )}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Priority: {task.priority}
                {task.category && ` • Category: ${task.category}`}
                {task.dueDate && ` • Due: ${new Date(task.dueDate).toLocaleDateString()}`}
              </Typography>
            </Box>
          </Grid>

          {/* Task actions */}
          <Grid item>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => onEdit(task)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => onDelete(task.id)}
                size="small"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskPages;