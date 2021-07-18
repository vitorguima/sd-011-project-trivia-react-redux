import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">
          OI , Agora é com Você Diegão, boa sorte =]
        </h1>
        <Link to="/">
          <button type="button">
            <FaArrowLeft
              type="logo"
              name="adjust"
              color="blue"
              size="60px"
              border="square"
            />
          </button>
        </Link>
      </div>
    );
  }
}

export default FeedBack;
