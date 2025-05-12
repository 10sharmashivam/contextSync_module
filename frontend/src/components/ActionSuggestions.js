import React, { useEffect, useState } from 'react';
import { fetchActions } from '../services/api';

/**
 * Component to render a list of suggested actions for an email. The actions
 * are retrieved from the API and are rendered as buttons.
 *
 * @param {string} emailId - ID of the email to retrieve actions for.
 *
 * @returns {React.ReactElement} A React component with the actions rendered as
 *    buttons.
 */
const ActionSuggestions = ({ emailId }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions(emailId).then((data) => setActions(data.actions));
  }, [emailId]);

  return (
    <div>
      {actions.map((action, index) => (
        <button key={index} onClick={() => alert(`Action: ${action.label}`)}>
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionSuggestions;