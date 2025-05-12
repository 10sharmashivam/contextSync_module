import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Fetches the prioritized emails by calling the /prioritize endpoint.
 *
 * @return {Promise<Array<import('./types').Email>>} The list of prioritized emails.
 */
export const fetchPrioritizedEmails = async () => {
  const response = await axios.post(`${API_URL}/prioritize`, {
    emails: [],
    context: {
      calendar: [], // Fetch from /calendar/events in production
      slack: []     // Fetch from /slack/messages in production
    }
  });
  return response.data;
};

export const fetchActions = async (emailId) => {
  const response = await axios.post(`${API_URL}/actions`, {
    email: { id: emailId }
  });
  return response.data;
};