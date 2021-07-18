import React from 'react';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    return (
      <h1 data-testid="settings-title">Tela de Configurações</h1>
    );
  }
}

export default connect()(Settings);
