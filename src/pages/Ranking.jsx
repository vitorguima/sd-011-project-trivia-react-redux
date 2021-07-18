import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Ranking extends Component {
/*   constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  } */

  /*   componentDidMount() {
    this.handleRanking();
  } */

  handleGravatar() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = localStg.player;
    return md5(gravatarEmail).toString();
  }

  render() {
    const { rank } = this.props;
    const localStg = rank.player;
    console.log(localStg);
    return (
      <>
        {/* {localStg.map(({ name, score }, index) => (
          <div key={ index }>
            <h1 data-testid="ranking-title">
              Ranking
            </h1>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
              alt="Gravatar"
            />
            <h2 data-testid={ `player-name-${index}` }>
              {name}

            </h2>
            <p data-testid="header-score">
              {score}
              {' '}
            </p>
          </div>))} */}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Volta para a tela inicial
          </button>
        </Link>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  rank: state.ranking,
});

export default connect(mapStateToProps)(Ranking);
