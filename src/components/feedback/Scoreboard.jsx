import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Scorebboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    const { score, assertions } = user;
    return (
      <div className="feedback-scoreboard">
        <h2>
          Você acertou:
          <span data-testid="feedback-total-score">{ assertions }</span>
          de 5 perguntas.
        </h2>
        <h2>
          Você fez:
          <span data-testid="feedback-total-question">{ score }</span>
          pontos.
        </h2>

        <div className="feedback-scoreboard-button">
          <Link to="/">
            <button
              className="feedback-buttons"
              type="button"
              data-testid="btn-play-again"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

Scorebboard.propTypes = {
  user: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Scorebboard);
