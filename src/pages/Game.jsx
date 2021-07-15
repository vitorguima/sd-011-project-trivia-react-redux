import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      count: 30,
      disabled: false,
    };
    this.counter = this.counter.bind(this);
    this.counterFunc = this.counterFunc.bind(this);
  }

  componentDidMount() {
    this.counter();
  }

  counterFunc() {
    const { count } = this.state;
    if (count > 0) {
      this.setState({
        count: count - 1,
      });
    } else if (count === 0) {
      this.setState({
        count: 0,
        disabled: true,
      });
    }
  }

  counter() {
    const interval = 1000;
    setInterval(this.counterFunc, interval);
  }

  render() {
    const { questionArray } = this.props;
    const { disabled, count } = this.state;
    return (
      <div>
        <HeaderGame />
        <Question question={ questionArray[0] } disabled={ disabled } />
        {/* { questionArray.length > 0 && questionArray.map((question, index) => (
          <Question key={ index } question={ question } />
        )) } */}
        { count }
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  questionArray: gameReducer.questions,
});

Game.propTypes = ({
  questionArray: PropTypes.arrayOf(PropTypes.object),
});

Game.defaultProps = ({
  questionArray: [],
});

export default connect(mapStateToProps)(Game);
