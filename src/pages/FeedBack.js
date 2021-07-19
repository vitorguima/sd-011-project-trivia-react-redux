import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    this.rankingStorage = this.rankingStorage.bind(this);
  }

  componentDidMount() {
    this.rankingStorage();
  }

  clickHandler() {
    this.setState({
      redirectRanking: true,
    });
  }

  rankingStorage() {
    const { name, score, picture } = this.props;
    const userRanking = [{
      name,
      score,
      picture,
    }];
    if (!localStorage.ranking || localStorage.ranking.length === 0) {
      localStorage.ranking = JSON.stringify(userRanking);
    } else {
      const localStorageRanking = JSON.parse(localStorage.ranking);
      localStorageRanking.push(userRanking);
      localStorage.ranking = JSON.stringify(localStorageRanking);
    }
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

const mapStateToProps = (state) => ({
  picture: state.player.srcGravatarImg,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedBack);

FeedBack.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
