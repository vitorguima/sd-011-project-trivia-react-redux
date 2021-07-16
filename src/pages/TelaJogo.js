import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNewApi } from '../actions/requestAPI';

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
  }

  componentDidMount() {
    const { recivedGameData, gameData } = this.props;
    recivedGameData();
    // console.log(gameData.results);
  }

  render() {
    const { score } = this.state;
    const { getdata: { emailHash, name, email }, gameData } = this.props;
    const player = { name, assertions: 0, score, gravatarEmail: email };
    localStorage.setItem('player', JSON.stringify(player));
    // localStorage.setItem('email', email);
    const array = gameData.results;
    return (
      <div>
        <header>
          <h1>Tela do jogo</h1>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">
            { score }
          </span>
        </header>
        <div>
          {array && array.map((value) => console.log(value.category))}
          {array && array.map((value) => (
            <p key={ value.category }>
              {value.category}
            </p>
          ))}
          {/* {array[0]} */}
          {/* {array && console.log(array)} */}
          {/* {
            console.log(Object.values(gameData)[0])
            gameData.map((value, index) => (
              <p key={ index }>
                {value}
              </p>
            ))
          } */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getdata: state.user.userData,
  gameData: state.requestGameAPI.gameData,
});

const mapDispatchToProps = (dispatch) => ({
  recivedGameData: (state) => dispatch(fetchNewApi(state)),
});

TelaJogo.propTypes = ({
  getdata: PropTypes.shape({
    emailHash: PropTypes.string,
    name: PropTypes.string,
  }),
  recivedGameData: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TelaJogo);
