import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedbackHeader extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  urlCreator() {
    const { email } = this.props;
    const hash = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return hash;
  }

  render() {
    const { nome, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.urlCreator() }
          alt="Foto do jogador"
        />
        <p data-testid="header-player-name">
          { nome }
        </p>
        Pontos:
        <span data-testid="header-score">
          { Number(score) }
        </span>
      </div>
    );
  }
}

FeedbackHeader.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.loginReducer.login.email,
  nome: state.loginReducer.login.nome,
  score: state.triviaReducer.score,
});

export default connect(mapStateToProps)(FeedbackHeader);
