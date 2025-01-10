import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Button,
  useTheme,
  Stack,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useTasks } from '../context/TaskContext';
import AddTaskModal from './AddTaskModal';

const StatCard = ({ icon: Icon, title, value, color }) => {
  const theme = useTheme();
  
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${color}.lighter`,
              color: `${color}.main`,
              display: 'flex'
            }}
          >
            <Icon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const { tasks, toggleTaskStatus, deleteTask, getStats } = useTasks();
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const stats = getStats();

  const recentTasks = tasks.slice(0, 3);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setTaskToEdit(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={TrendingUpIcon}
            title="Total Tasks"
            value={stats.totalTasks}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={CheckCircleIcon}
            title="Completed"
            value={stats.completedTasks}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ClockIcon}
            title="Pending"
            value={stats.pendingTasks}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={StarIcon}
            title="Priority Tasks"
            value={stats.priorityTasks}
            color="error"
          />
        </Grid>

        {/* Progress Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress Overview
              </Typography>
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(stats.completedTasks / stats.totalTasks) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Recent Tasks
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowAddModal(true)}
                >
                  Add Task
                </Button>
              </Box>
              
              <Stack spacing={2}>
                {recentTasks.map(task => (
                  <Card
                    key={task.id}
                    variant="outlined"
                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => toggleTaskStatus(task.id)}
                            sx={{ mr: 1, mt: -0.5 }}
                          >
                            {task.status === 'completed' ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <ClockIcon color="warning" />
                            )}
                          </IconButton>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{
                                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                              }}
                            >
                              {task.title}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                              <Chip
                                size="small"
                                label={task.priority}
                                color={
                                  task.priority === 'high' ? 'error' :
                                  task.priority === 'medium' ? 'warning' : 'success'
                                }
                              />
                              {task.category && (
                                <Chip
                                  size="small"
                                  label={task.category}
                                  color="info"
                                />
                              )}
                              {task.dueDate && (
                                <Typography variant="caption" color="text.secondary">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </Typography>
                              )}
                            </Stack>
                          </Box>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditTask(task)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => deleteTask(task.id)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddTaskModal 
        open={showAddModal}
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
};

export default Dashboard; 