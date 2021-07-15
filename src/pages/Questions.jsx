import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  handleGravatar() {
    const { email } = this.props;
    return md5(email).toString();
  }

  render() {
    const { name } = this.props;
    const { score } = this.state;
    return (
      <main>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
            alt="Gravatar"
          />
          <h2 data-testid="header-player-name">
            Usuário:
            { name }
          </h2>
          <p data-testid="header-score">{ score }</p>
        </header>
      </main>
    );
  }
}

Questions.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Questions);
