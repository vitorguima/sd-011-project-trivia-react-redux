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
    const { nome, url } = user;
    return (
      <header className="header-feedback">
        <img data-testid="header-profile-picture" src={ url } alt={ nome } />
        <h1 data-testid="header-player-name">{ nome }</h1>
        <h1>
          Pontuação:
          <span data-testid="header-score"> 0 </span>
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
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
