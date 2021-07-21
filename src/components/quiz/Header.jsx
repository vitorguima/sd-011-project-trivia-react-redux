import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { user } = this.props;
    const { nome, url, score } = user;
    return (
      <header className="header-quiz">
        <img data-testid="header-profile-picture" src={ url } alt={ nome } />
        <h1 data-testid="header-player-name">{ nome }</h1>
        <h1>
          Pontuação:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    url: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
