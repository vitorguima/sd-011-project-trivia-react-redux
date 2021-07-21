import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Configurações extends Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   // };
  // }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
      </div>
    );
  }
}

export default connect(null, null)(Configurações);
