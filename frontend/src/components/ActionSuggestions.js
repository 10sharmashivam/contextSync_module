import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { fetchActions } from '../services/api';

/**
 * Component to render a list of suggested actions for an email. The actions
 * are retrieved from the API and are rendered as interactive chips.
 *
 * @param {string} emailId - ID of the email to retrieve actions for.
 *
 * @returns {React.ReactElement} A React component with the actions rendered as
 *    interactive chips.
 */
const ActionSuggestions = ({ emailId }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    // For demo purposes, we'll use mock actions if the API call fails
    fetchActions(emailId)
      .then((data) => setActions(data.actions))
      .catch(() => {
        // Mock actions for demo
        setActions([
          { label: 'Schedule Meeting', type: 'calendar' },
          { label: 'Create Task', type: 'task' },
          { label: 'Add to Project', type: 'project' }
        ]);
      });
  }, [emailId]);

  const handleAction = (action) => {
    switch(action.type) {
      case 'calendar':
        alert(`Scheduling meeting for email: ${emailId}`);
        break;
      case 'task':
        alert(`Creating task for email: ${emailId}`);
        break;
      case 'project':
        alert(`Adding to project for email: ${emailId}`);
        break;
      default:
        alert(`Action triggered: ${action.label}`);
    }
  };

  return (
    <Box mb={4}>
      <Box 
        display="flex" 
        flexWrap="wrap" 
        gap={1}
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {actions.map((action, index) => (
          <Chip
            key={index}
            label={action.label}
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => handleAction(action)}
            sx={{ 
              borderRadius: 1,
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 2px 8px rgba(25,118,210,0.3)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ActionSuggestions;