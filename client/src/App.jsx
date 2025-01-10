import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline, Box } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import TaskPages from './pages/TaskPages'
import { CustomThemeProvider } from './context/ThemeContext'
import { TaskProvider } from './context/TaskContext'

const App = () => {
  return (
    // Theme provider wrapper for custom theme management
    <CustomThemeProvider>
      {/* Snackbar provider for toast notifications */}
      <SnackbarProvider 
        maxSnack={3} // Maximum number of notifications shown at once
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {/* Task context provider for global task state management */}
        <TaskProvider>
          {/* Material UI baseline CSS reset */}
          <CssBaseline />
          
          {/* Main app container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh', // Full viewport height
            }}
          >
            {/* Router setup for navigation */}
            <Router>
              {/* Header component (navigation bar) */}
              <Header />
              
              {/* Main content area */}
              <Box sx={{ flex: 1 }}>
                {/* Route definitions */}
                <Routes>
                  {/* Dashboard route (home page) */}
                  <Route path="/" element={<Dashboard />} />
                  {/* Tasks management page route */}
                  <Route path="/tasks" element={<TaskPages />} />
                </Routes>
              </Box>
              
              {/* Footer component */}
              <Footer />
            </Router>
          </Box>
        </TaskProvider>
      </SnackbarProvider>
    </CustomThemeProvider>
  );
};

export default App;