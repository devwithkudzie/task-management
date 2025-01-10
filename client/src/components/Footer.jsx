import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme, Stack } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(15, 23, 42, 0.3)'
          : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Left side */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Developed by
            </Typography>
            <Link
              href="https://github.com/devwithkudzie"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              @devwithkudzie
            </Link>
          </Stack>

          {/* Right side */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
            }
          >
            <Typography variant="body2" color="text.secondary">
              © {year} TaskMasters
            </Typography>
            <Link
              href="https://github.com/devwithkudzie/taskmasters"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">Source Code</Typography>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 