import React, { useEffect, useState } from 'react';
import { fetchPrioritizedEmails } from '../services/api';
import './styles/Dashboard.css';

  /**
   * Component for rendering the dashboard view. This will fetch the prioritized
   * emails and display them in order of priority.
   *
   * @return {JSX.Element} The rendered component.
   */
const Dashboard = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchPrioritizedEmails().then((data) => setEmails(data));
  }, []);

  return (
    <div className="dashboard">
      <h2>Prioritized Emails</h2>
      {emails.map((email) => (
        <div key={email.id}>
          <p>{email.subject} (Priority: {email.priority.toFixed(2)})</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;