import React from 'react';
import '../Settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1 className="settings-title" data-testid="settings-title">
          Settings
        </h1>
        <img
          className="settings-img"
          src="assets/beecry.png"
          alt="desenho de uma abelha chorando"
        />
        <p className="settings-text">
          Nothing here. <br />
          Sorry...
        </p>
      </div>
    );
  }
}

export default Settings;
