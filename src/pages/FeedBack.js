import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import MSGFeedBack from '../components/MSGFeedBack';
import Header from '../components/Header';

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
  // Finalizado

  render() {
    const { redirectRanking } = this.state;
    if (redirectRanking) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        <MSGFeedBack />
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
