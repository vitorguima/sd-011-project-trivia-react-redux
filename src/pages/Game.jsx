import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';

class Game extends Component {
  render() {
    const { questionArray } = this.props;
    return (
      <div>
        <HeaderGame />
        <Question question={ questionArray[0] } />
        {/* { questionArray.length > 0 && questionArray.map((question, index) => (
          <Question key={ index } question={ question } />
        )) } */}
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
