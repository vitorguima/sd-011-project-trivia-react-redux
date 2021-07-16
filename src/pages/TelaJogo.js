import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
  }

  // componentDidMount() {
  //   const { getdata } = this.props;
  //   const { emailHash } = getdata;

  //   console.log(getdata);
  // }

  render() {
    // const { score } = this.state;
    // const { getdata } = this.props;
    // const { emailHash, name } = getdata;

    const { score } = this.state;
    const { getdata: { emailHash, name } } = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getdata: state.user.userData,
});

// TelaJogo.defaultProps = {
//   emailHash: 'alguem@algo.com',
//   name: 'michel',
// };

TelaJogo.propTypes = {
  getdata: PropTypes.shape({
    emailHash: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, null)(TelaJogo);
