import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Fade } from '@mui/material';
import EmailList from './EmailList';
import ContextPanel from './ContextPanel';
import EmailIcon from '@mui/icons-material/Email';

/**
 * Component for rendering the dashboard view. This will fetch the prioritized
 * emails and display them in order of priority.
 *
 * @return {JSX.Element} The rendered component.
 */
const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const fetchPrioritizedEmails = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5004/api/prioritize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ context: {} }), // Empty context for demo
        });

        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }

        const data = await response.json();
        setEmails(data.emails);
        setError(null);
      } catch (err) {
        console.error('Error fetching emails:', err);
        setError('Failed to fetch emails. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrioritizedEmails();
  }, []);

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        <CircularProgress 
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main',
            mb: 2
          }}
        />
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Loading your emails...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        <Alert 
          severity="error"
          sx={{
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            '& .MuiAlert-icon': {
              fontSize: 28
            }
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Box 
            display="flex" 
            alignItems="center" 
            mb={4}
            sx={{
              background: 'linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 100%)',
              p: 2,
              borderRadius: 2
            }}
          >
            <EmailIcon 
              sx={{ 
                fontSize: 32, 
                color: 'primary.main',
                mr: 2
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Email Dashboard
            </Typography>
          </Box>

          <Box 
            display="flex" 
            sx={{ 
              gap: 4,
              '& > *': {
                transition: 'all 0.3s ease-in-out'
              }
            }}
          >
            <Box 
              sx={{ 
                width: '60%',
                transform: selectedEmail ? 'translateX(-10px)' : 'none'
              }}
            >
              <EmailList emails={emails} onEmailSelect={handleEmailSelect} />
            </Box>
            <Box 
              sx={{ 
                width: '40%',
                transform: selectedEmail ? 'translateX(10px)' : 'none'
              }}
            >
              <ContextPanel email={selectedEmail} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Dashboard;