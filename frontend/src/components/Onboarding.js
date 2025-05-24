import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Stack } from '@mui/material';
import { Google as GoogleIcon, Message as MessageIcon } from '@mui/icons-material';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleGoogleConnect = async () => {
    try {
      window.location.href = 'http://localhost:5004/auth/google';
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
    }
  };

  const handleSlackConnect = () => {
    // Show a message that Slack integration is coming soon
    alert('Slack integration coming soon! For now, you can proceed with Google Calendar integration.');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to ContextSync
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Connect your tools to get started with smart email prioritization.
          </Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleConnect}
              fullWidth
              sx={{
                backgroundColor: '#4285F4',
                '&:hover': {
                  backgroundColor: '#357ABD',
                },
              }}
            >
              Connect Google Calendar
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<MessageIcon />}
              onClick={handleSlackConnect}
              fullWidth
              sx={{
                backgroundColor: '#4A154B',
                '&:hover': {
                  backgroundColor: '#3A1139',
                },
              }}
            >
              Connect Slack
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            We'll use these integrations to prioritize your emails based on your calendar events and team communications.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Onboarding;