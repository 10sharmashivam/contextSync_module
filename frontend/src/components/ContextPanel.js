import React from 'react';
import { Paper, Typography, Box, Divider, List, ListItem, ListItemText, Chip, Fade, Zoom } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { format } from 'date-fns';
import ActionSuggestions from './ActionSuggestions';

const ContextPanel = ({ email }) => {
  const handleSlackAction = (action) => {
    switch(action) {
      case 'project-updates':
        alert('Posted to #project-updates: "New project update from ' + email.sender + ' - ' + email.subject + '"');
        break;
      case 'team-sync':
        alert('Posted to #team-sync: "Team notification: ' + email.subject + ' requires attention"');
        break;
      case 'feature-requests':
        alert('Created thread in #feature-requests: "New feature request: ' + email.subject + '"');
        break;
      default:
        alert('Slack action triggered: ' + action);
    }
  };

  const handleSmartAction = (rule) => {
    switch(rule) {
      case 'Auto-add to team sync agenda':
        alert('Added to team sync agenda: "' + email.subject + '"');
        break;
      case 'Notify team members 24h before':
        alert('Scheduled notification for team members 24h before the meeting');
        break;
      case 'Create meeting notes template':
        alert('Created meeting notes template with agenda items from the email');
        break;
      case 'Auto-create feature request ticket':
        alert('Created feature request ticket in Jira: "' + email.subject + '"');
        break;
      case 'Notify product team':
        alert('Notified product team about new feature request');
        break;
      case 'Schedule technical review':
        alert('Scheduled technical review meeting for the new feature');
        break;
      case 'Auto-add to monthly review':
        alert('Added to monthly review agenda: "' + email.subject + '"');
        break;
      case 'Share with relevant teams':
        alert('Shared newsletter with relevant teams');
        break;
      case 'Archive after review':
        alert('Scheduled archive after monthly review');
        break;
      case 'Auto-add to calendar':
        alert('Added office party to calendar: "' + email.subject + '"');
        break;
      case 'Send reminder before event':
        alert('Scheduled reminder for office party');
        break;
      case 'Collect RSVPs':
        alert('Created RSVP form for office party');
        break;
      default:
        alert('Smart action triggered: ' + rule);
    }
  };

  if (!email) {
    return (
      <Fade in={true}>
        <Paper 
          sx={{ 
            p: 4, 
            height: '100%',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100%"
            sx={{
              background: 'radial-gradient(circle at center, rgba(25,118,210,0.05) 0%, rgba(255,255,255,0) 70%)'
            }}
          >
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
              <LightbulbIcon sx={{ 
                fontSize: 64, 
                color: 'primary.main', 
                mb: 2, 
                opacity: 0.8,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }} />
            </Zoom>
            <Typography 
              variant="h5" 
              gutterBottom 
              align="center"
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Context Panel
            </Typography>
            <Typography 
              color="text.secondary" 
              align="center"
              sx={{ 
                maxWidth: '80%',
                lineHeight: 1.6
              }}
            >
              Select an email to view its context and suggested actions
            </Typography>
          </Box>
        </Paper>
      </Fade>
    );
  }

  const { context = {} } = email;
  const { calendar_events = [], slack_messages = [], suggested_actions = [], workflow_rules = [] } = context;

  return (
    <Fade in={true}>
      <Paper 
        sx={{ 
          p: 4, 
          height: '100%',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          overflow: 'auto'
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 600,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Context Panel
        </Typography>

        {/* Calendar Events */}
        <Box mb={4}>
          <Box 
            display="flex" 
            alignItems="center" 
            mb={2}
            sx={{
              background: 'linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 100%)',
              p: 1,
              borderRadius: 1
            }}
          >
            <EventIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Related Calendar Events
            </Typography>
          </Box>
          <List 
            dense 
            sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 2, 
              p: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {calendar_events.map((event, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  mb: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {event.summary}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Box display="flex" alignItems="center" mt={0.5}>
                        <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {format(new Date(event.start), 'MMM d, h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {event.description}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Slack Messages */}
        <Box mb={4}>
          <Box 
            display="flex" 
            alignItems="center" 
            mb={2}
            sx={{
              background: 'linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 100%)',
              p: 1,
              borderRadius: 1
            }}
          >
            <MessageIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Related Slack Messages
            </Typography>
          </Box>
          <List 
            dense 
            sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 2, 
              p: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {slack_messages.map((message, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  mb: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 500, 
                          color: 'primary.main',
                          mr: 1
                        }}
                      >
                        #{message.channel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {message.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Suggested Actions */}
        <Box mb={4}>
          <Box 
            display="flex" 
            alignItems="center" 
            mb={2}
            sx={{
              background: 'linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 100%)',
              p: 1,
              borderRadius: 1
            }}
          >
            <LightbulbIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Suggested Actions
            </Typography>
          </Box>
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
            {suggested_actions.map((action, index) => (
              <Chip
                key={index}
                label={action}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ 
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
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

        {/* Slack Actions */}
        <Box mb={4}>
          <Box 
            display="flex" 
            alignItems="center" 
            mb={2}
            sx={{
              background: 'linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 100%)',
              p: 1,
              borderRadius: 1
            }}
          >
            <MessageIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Slack Actions
            </Typography>
          </Box>
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
            <Chip
              label="Post to #project-updates"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleSlackAction('project-updates')}
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
            <Chip
              label="Notify team in #team-sync"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleSlackAction('team-sync')}
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
            <Chip
              label="Create thread in #feature-requests"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleSlackAction('feature-requests')}
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
          </Box>
        </Box>

        {/* Action Suggestions */}
        {email && <ActionSuggestions emailId={email.id} />}

        {/* Smart Actions */}
        <Box>
          <Box 
            display="flex" 
            alignItems="center" 
            mb={2}
            sx={{
              background: 'linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 100%)',
              p: 1,
              borderRadius: 1
            }}
          >
            <AutoAwesomeIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Smart Actions
            </Typography>
          </Box>
          <List 
            dense 
            sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 2, 
              p: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {workflow_rules.map((rule, index) => (
              <ListItem 
                key={index}
                onClick={() => handleSmartAction(rule)}
                sx={{ 
                  mb: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.secondary">
                      {rule}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ContextPanel; 