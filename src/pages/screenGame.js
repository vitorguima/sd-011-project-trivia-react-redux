import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerComponent from '../components/PlayerComponent';
import GameComponent from '../components/GameComponent';
import TimerComponent from '../components/TimerComponent';
import { fetchTrivia } from '../actions';

class screenGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: '',
    };
    this.fetchToken = this.fetchToken.bind(this);
    this.finishQuestions = this.finishQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const { searchQuestion } = this.props;
    const recoveredToken = JSON.parse(localStorage.getItem('token'));

    if (recoveredToken !== null) {
      this.setState({
        loading: true,
        token: recoveredToken.token,
      });
    }
    const { loading, token } = this.state;
    if (!loading) {
      searchQuestion(token);
    }
  }

  finishQuestions() {
    const { history } = this.props;
    history.push('/feedback');
  }

  render() {
    const { token } = this.state;
    console.log(token);
    return (
      <div>
        <PlayerComponent />
        <GameComponent />
        <TimerComponent finishQuestions={ this.finishQuestions } />
      </div>
    );
  }
}

screenGame.propTypes = {
  searchQuestion: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  searchQuestion: (token) => dispatch(fetchTrivia(token)),
});

export default connect(null, mapDispatchToProps)(screenGame);
