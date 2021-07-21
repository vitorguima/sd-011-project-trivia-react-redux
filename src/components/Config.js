import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Config.css';

export default class Config extends Component {
  render() {
    return (
      <div className="config-page">
        <h2 data-testid="settings-title">Configurações</h2>
        <Link className="home-btn" to="/">Home</Link>
      </div>
    );
  }
}
