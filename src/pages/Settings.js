import React from 'react';
import { Link } from 'react-router-dom';

/* import { connect } from 'react-redux'; */

class Settings extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Voltar</Link>
        <h1 data-testid="settings-title">Settings</h1>
      </div>
    );
  }
}

export default Settings;
