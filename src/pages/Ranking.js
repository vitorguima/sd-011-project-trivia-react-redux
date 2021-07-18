import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <Link to="/game">
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

export default Ranking;
