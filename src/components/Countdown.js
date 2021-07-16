import React from 'react';
import PropTypes from 'prop-types';

const SECOND = 1000;

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.complete = false;
    this.state = { timer: 30 };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      SECOND,
    );
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { onComplete } = this.props;

    if (timer === 0 && this.complete === false) {
      clearInterval(this.interval);
      this.complete = true;
      onComplete();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <h3>
          {timer}
        </h3>
      </div>
    );
  }
}

Countdown.propTypes = {
  onComplete: PropTypes.func.isRequired };

export default Countdown;
