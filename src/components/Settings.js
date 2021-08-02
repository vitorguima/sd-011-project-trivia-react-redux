import React from 'react';
import settings from './outros.png';

export default class Settings extends React.Component {
  render() {
    return (
      <div>
        <img src={ settings } className="settingsLogo" alt="imagem de engrenagem" />
        <h1 data-testid="settings-title">Seetings :)</h1>
      </div>
    );
  }
}
