import React, { PureComponent } from 'react';
import '../styles/Settings.css';

class Settings extends PureComponent {
  render() {
    return (
      <h1 className="title" data-testid="settings-title">Tela de configurações</h1>
    );
  }
}

export default Settings;
