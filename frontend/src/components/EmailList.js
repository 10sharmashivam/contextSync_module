import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Box, Fade } from '@mui/material';
import { format } from 'date-fns';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EmailList = ({ emails, onEmailSelect }) => {
  return (
    <Fade in={true}>
      <Paper 
        elevation={0}
        sx={{ 
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          overflow: 'hidden'
        }}
      >
        <List sx={{ p: 0 }}>
          {emails.map((email, index) => (
            <ListItem
              key={email.id}
              button
              onClick={() => onEmailSelect(email)}
              sx={{
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(25,118,210,0.04)',
                  transform: 'translateX(8px)'
                },
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <ListItemText
                primary={
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    mb={1}
                  >
                    <Typography 
                      variant="subtitle1" 
                      component="div"
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      {email.subject}
                    </Typography>
                    <Box 
                      display="flex" 
                      alignItems="center"
                      sx={{
                        backgroundColor: email.priority > 0.7 ? 'rgba(211,47,47,0.1)' : 'rgba(46,125,50,0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <PriorityHighIcon 
                        sx={{ 
                          fontSize: 16, 
                          mr: 0.5,
                          color: email.priority > 0.7 ? 'error.main' : 'success.main'
                        }} 
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: email.priority > 0.7 ? 'error.main' : 'success.main',
                          fontWeight: 500
                        }}
                      >
                        {Math.round(email.priority * 100)}% Priority
                      </Typography>
                    </Box>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      {format(new Date(), 'MMM d, h:mm a')}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 0.5,
                        fontWeight: 500
                      }}
                    >
                      From: {email.sender}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.4
                      }}
                    >
                      {email.content}
                    </Typography>
                  </Box>
                }
                sx={{
                  py: 2,
                  px: 3
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Fade>
  );
};

export default EmailList; 