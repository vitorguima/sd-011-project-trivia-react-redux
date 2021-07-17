import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { profileScore, profileAssertion } = this.props;
    const expectedScore = 3;
    return (
      <div>
        <h3
          data-testid="feedback-text"
        >
          { profileScore < expectedScore ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h3>
        <h2
          data-testid="feedback-total-score"
        >
          { profileAssertion }
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileScore: state.player.score,
  profileAssertion: state.player.assertions,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  profileScore: PropTypes.string.isRequired,
  profileAssertion: PropTypes.number.isRequired,
};
