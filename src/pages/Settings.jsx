import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDifficulty } from '../actions';

class Settings extends Component {
  constructor() {
    super();
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  changeDifficulty({ target }) {
    const { setDifficulty } = this.props;
    const { value } = target;

    setDifficulty(value);
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <label htmlFor="difficulty">
          Questions difficulty:
          <select
            id="difficulty"
            onChange={ this.changeDifficulty }
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDifficulty: (difficulty) => dispatch(actionDifficulty(difficulty)),
});

Settings.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
