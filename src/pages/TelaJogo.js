import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Category from '../components/Category';
import Question from '../components/Question';
import CorrectAnswer from '../components/CorrectAnswer';
import WrongAnswer from '../components/WrongAnswer';
import Header from '../components/Header';
import Timer from '../components/Timer';

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      count: 0,
    };
  }

  render() {
    const { score, count } = this.state;
    const { getdata: { emailHash, name, email }, gameData: { results } } = this.props;
    const FIVE = 5;
    const array = results;
    const player = { name, assertions: 0, score, gravatarEmail: email };

    localStorage.setItem('player', JSON.stringify(player));
    return (
      <div>
        <Header name={ name } emailHash={ emailHash } score={ score } />
        {array && count < FIVE ? (
          <div>
            <Category
              array={ array }
              count={ count }
            />
            <Question
              array={ array }
              count={ count }
            />
            <CorrectAnswer
              array={ array }
              count={ count }
            />
            <WrongAnswer array={ Object.values(array[count])[5] } />
            {console.log(Object.values(array[count])[5][0])}
            <Timer />
          </div>
        ) : (
          <p> Fim do jogo </p>
        )}
        <button
          type="button"
          onClick={ () => {
            this.setState({
              count: count + 1,
            });
          } }
        >
          botão
        </button>
      </div>
    );
  }
}

TelaJogo.propTypes = ({
  getdata: PropTypes.shape({
    emailHash: PropTypes.string,
    name: PropTypes.string,
  }),
}).isRequired;

export default TelaJogo;
