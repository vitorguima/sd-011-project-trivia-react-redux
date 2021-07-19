import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/feedback/Header';
import Scoreboard from '../components/feedback/Scoreboard';
import '../style/feedback.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const minHit = 3;
    // const { user: { assertions } } = this.props;
    const playerStorageString = localStorage.getItem('state');
    const playerStorage = JSON.parse(playerStorageString);
    return (
      <>
        <Header />
        <div className="container-feedback">
          <h1 data-testid="feedback-text" className="feedback-title">
            {
              (playerStorage.player.assertions >= minHit)
                ? 'Mandou bem!'
                : 'Podia ser melhor...'
            }
          </h1>
          <Scoreboard />
          <hr className="hr-feedback" />
          <Link to="/ranking">
            <button className="feedback-buttons" type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

Feedback.propTypes = {
  user: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
