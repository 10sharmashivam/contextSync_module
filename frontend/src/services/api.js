import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5004';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Important for session cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Fetches the prioritized emails by calling the /prioritize endpoint.
 *
 * @return {Promise<Array<import('./types').Email>>} The list of prioritized emails.
 */
export const fetchPrioritizedEmails = async () => {
  const response = await api.post('/prioritize', {
    emails: [],
    context: {
      calendar: [], // Fetch from /calendar/events in production
      slack: []     // Fetch from /slack/messages in production
    }
  });
  return response.data;
};

export const fetchActions = async (emailId) => {
  const response = await api.post('/actions', {
    email: { id: emailId }
  });
  return response.data;
};