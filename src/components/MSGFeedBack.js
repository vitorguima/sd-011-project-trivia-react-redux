import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.feedbackScore = this.feedbackScore.binf(this);
  }

  feedbackScore() {
    const { profileScore } = this.props;
    const expectedScore = 3;
    return profileScore < expectedScore ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <h3
          data-testid="feedback-text"
        >
          { this.feedbackScore() }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileScore: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  profileScore: PropTypes.string.isRequired,
};
