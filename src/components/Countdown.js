import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Countdown extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <div>
        <h3>
          {timer}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.countDownReducer.timer,
});

Countdown.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Countdown);
