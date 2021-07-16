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
    const { recivedGameData } = this.props;
    console.log(recivedGameData());
  }

  render() {
    const { score } = this.state;
    const { getdata: { emailHash, name }, recivedGameData } = this.props;
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
          {
            console.log(recivedGameData())
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getdata: state.user.userData,
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
