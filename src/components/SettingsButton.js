import React from 'react';
import { useHistory } from 'react-router';

const SettingsButton = () => {
  const history = useHistory();
  const sendSettings = () => {
    history.push('/settings');
  };
  return (
    <button
      type="button"
      data-testid="btn-settings"
      onClick={ sendSettings }
    >
      Settings
    </button>
  );
};

export default SettingsButton;
