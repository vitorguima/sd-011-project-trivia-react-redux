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
  }

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const { searchQuestion } = this.props;
    const recoveredToken = JSON.parse(localStorage.getItem('token'));
    this.setState({
      token: recoveredToken.token,
    });

    const { token } = this.state;

    if (token !== null) {
      this.setState({
        loading: true,
      });
    }
    const { loading } = this.state;
    if (!loading) {
      searchQuestion(token);
    }
  }

  render() {
    const { token } = this.state;
    console.log(token);
    return (
      <div>
        <PlayerComponent />
        <GameComponent />
        <TimerComponent />
      </div>
    );
  }
}

screenGame.propTypes = {
  searchQuestion: PropTypes.func,
};

screenGame.defaultProps = {
  searchQuestion: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  searchQuestion: (token) => dispatch(fetchTrivia(token)),
});

export default connect(null, mapDispatchToProps)(screenGame);
