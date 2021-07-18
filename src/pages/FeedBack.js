import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectRanking: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      redirectRanking: true,
    });
  }

  render() {
    const { redirectRanking } = this.state;
    if (redirectRanking) return <Redirect to="/ranking" />;
    return (
      <div>
        <h1 data-testid="feedback-text">
          OI , Agora é com Você Diogão, boa sorte =]
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
        <button
          onClick={ this.clickHandler }
          type="button"
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

export default FeedBack;
