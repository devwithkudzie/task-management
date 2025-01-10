import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  ListItemIcon,
  ListItemText,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Task as TaskIcon,
  LightMode as SunIcon,
  DarkMode as MoonIcon,
  CheckCircle as LogoIcon,
  Close as CloseIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useCustomTheme } from '../context/ThemeContext';
import Logo from './Logo';

const NavButton = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={to}
      sx={{
        px: 2.5,
        py: 1.5,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: isActive ? 'primary.main' : 'text.secondary',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: isActive ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
          height: 3,
          width: '80%',
          borderRadius: '4px 4px 0 0',
          backgroundColor: theme.palette.primary.main,
          transition: 'transform 0.2s ease',
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          '&::before': {
            transform: 'translateX(-50%) scaleX(1)',
          }
        }
      }}
    >
      <Icon sx={{ fontSize: 20 }} />
      {label}
    </Button>
  );
};

const Header = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const open = Boolean(anchorEl);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky"
      color="default" 
      elevation={isScrolled ? 1 : 0}
      sx={{
        top: 0,
        backdropFilter: 'blur(10px)',
        backgroundColor: isScrolled 
          ? theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.8)'
            : 'rgba(255, 255, 255, 0.8)'
          : theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.6)'
            : 'rgba(255, 255, 255, 0.6)',
        borderBottom: `1px solid ${isScrolled 
          ? theme.palette.divider 
          : 'transparent'}`,
        transition: theme.transitions.create([
          'background-color',
          'border-bottom',
          'box-shadow'
        ], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Container>
        <Toolbar 
          disableGutters
          sx={{
            height: isScrolled ? 64 : 72,
            transition: theme.transitions.create('height', {
              duration: theme.transitions.duration.shorter,
            }),
          }}
        >
          {/* Logo and Brand */}
          <Box 
            component={Link} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
              ...(isScrolled && {
                transform: 'scale(0.95)',
              }),
            }}
          >
            <Logo size={isScrolled ? 28 : 32} />
            <Typography
              variant="h6"
              sx={{
                ml: 1.5,
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              TaskMasters
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <NavButton to="/" icon={HomeIcon} label="Dashboard" />
            <NavButton to="/tasks" icon={TaskIcon} label="Tasks" />
            
            <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              <IconButton 
                onClick={toggleTheme} 
                sx={{ 
                  ml: 2,
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Mobile Menu */}
          <Box 
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
              ...(isScrolled && {
                transform: 'scale(0.95)',
              }),
            }}
          >
            <Tooltip title={open ? "Close menu" : "Open menu"}>
              <IconButton
                onClick={handleMenu}
                color="inherit"
                sx={{ 
                  bgcolor: open ? theme.palette.action.selected : theme.palette.action.hover,
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: theme.palette.action.selected,
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Fade in={!open}>
                  <MenuIcon sx={{ position: 'absolute' }} />
                </Fade>
                <Fade in={open}>
                  <CloseIcon sx={{ position: 'absolute' }} />
                </Fade>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 250,
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  backgroundImage: 'none',
                  overflow: 'hidden',
                }
              }}
            >
              {/* Menu Header */}
              <Box sx={{ 
                p: 2, 
                bgcolor: theme.palette.action.hover,
                borderBottom: `1px solid ${theme.palette.divider}`
              }}>
                <Typography variant="subtitle2" color="text.secondary">
                  MENU
                </Typography>
              </Box>

              {/* Navigation Items */}
              <Box sx={{ py: 1 }}>
                <MenuItem 
                  component={Link} 
                  to="/" 
                  onClick={handleClose}
                  selected={location.pathname === '/'}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    mx: 1,
                    my: 0.5,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: theme.palette.primary.main + '15',
                    },
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    }
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon fontSize="small" color={location.pathname === '/' ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dashboard"
                    primaryTypographyProps={{
                      color: location.pathname === '/' ? 'primary' : 'inherit',
                      fontWeight: location.pathname === '/' ? 600 : 400,
                    }}
                  />
                </MenuItem>

                <MenuItem 
                  component={Link} 
                  to="/tasks" 
                  onClick={handleClose}
                  selected={location.pathname === '/tasks'}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    mx: 1,
                    my: 0.5,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: theme.palette.primary.main + '15',
                    },
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    }
                  }}
                >
                  <ListItemIcon>
                    <TaskIcon fontSize="small" color={location.pathname === '/tasks' ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Tasks"
                    primaryTypographyProps={{
                      color: location.pathname === '/tasks' ? 'primary' : 'inherit',
                      fontWeight: location.pathname === '/tasks' ? 600 : 400,
                    }}
                  />
                </MenuItem>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Settings Section */}
              <Box sx={{ p: 2 }}>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ px: 1, mb: 1, display: 'block' }}
                >
                  PREFERENCES
                </Typography>
                <MenuItem
                  onClick={() => {
                    toggleTheme();
                    handleClose();
                  }}
                  sx={{ 
                    py: 1.5,
                    px: 1,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    }
                  }}
                >
                  <ListItemIcon>
                    {isDarkMode ? <SunIcon fontSize="small" /> : <MoonIcon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
                  />
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;