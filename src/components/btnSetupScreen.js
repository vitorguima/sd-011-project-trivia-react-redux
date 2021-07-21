import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import settingsIMG from '../images/gear.png';

class btnSetupScreen extends Component {
  render() {
    return (
      <Link to="/Setup">
        <div className="div-btn-settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="btn-settings btn-neon-red"
          >
            Configurações
          </button>
          <div className="btn-div-img-settings">
            <img src={ settingsIMG } alt="" className="btn-img-settings" />
          </div>
        </div>
      </Link>
    );
  }
}

export default btnSetupScreen;
