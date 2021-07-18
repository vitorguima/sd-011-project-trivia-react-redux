import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Performance extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  render() {
    const msg1 = 'Podia ser melhor...';
    const msg2 = 'Mandou bem!';
    const expectedPerformace = 3;
    const { assertions } = this.props;

    return (
      <p
        data-testid="feedback-text"
      >
        {
          (assertions >= expectedPerformace)
            ? msg2 : msg1
        }
      </p>
    );
  }
}

Performance.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.triviaReducer.assertions,
});

export default connect(mapStateToProps)(Performance);
