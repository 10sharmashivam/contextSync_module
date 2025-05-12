import React, { useEffect, useState } from 'react';
import { fetchActions } from '../services/api';

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