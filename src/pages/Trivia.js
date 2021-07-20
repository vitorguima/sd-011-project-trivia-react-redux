import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerComponent from '../components/PlayerComponent';
import QuestionsComponent from '../components/QuestionsComponent';
import { fetchTrivia } from '../actions';

class Trivia extends Component {
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

  render() {
    const { token } = this.state;
    console.log(token);
    return (
      <div>
        <PlayerComponent />
        <QuestionsComponent />
      </div>
    );
  }
}

Trivia.propTypes = {
  searchQuestion: PropTypes.func,
};

Trivia.defaultProps = {
  searchQuestion: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  searchQuestion: (token) => dispatch(fetchTrivia(token)),
});

export default connect(null, mapDispatchToProps)(Trivia);
