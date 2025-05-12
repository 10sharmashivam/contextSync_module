import React from 'react';
import '../styles/Onboarding.css';

const Onboarding = () => {
  return (
    <div className="onboarding">
      <h2>Connect Your Tools</h2>
      <p>Link Google Calendar and Slack to prioritize emails.</p>
      <button onClick={() => alert('Google Auth (MVP Placeholder)')}>
        Connect Google Calendar
      </button>
      <button onClick={() => alert('Slack Auth (MVP Placeholder)')}>
        Connect Slack
      </button>
    </div>
  );
};

export default Onboarding;