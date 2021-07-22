import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Countdown from "../components/Countdown";
import Question from "../components/Question";
import { requestApiQuestions } from "../actions";
import UserAvatar from "../components/UserAvatar";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { score: 0 };
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  onScoreChange(score) {
    this.setState({ score });
  }

  componentDidMount() {
    const { questionsToStore } = this.props;
    const token = localStorage.getItem("token");
    questionsToStore(token);
  }

  render() {
    const { score } = this.state;
    const {
      userName,
      history: { push },
    } = this.props;

    return (
      <>
        <img
          className="all-pages-logo"
          src="assets/logo.png"
          alt="logo trivia"
        />
        <header>
          <UserAvatar />
          <p data-testid="header-player-name">{`User: ${userName}`}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <Countdown />
        <main>
          <Question push={push} onScoreChange={this.onScoreChange} />
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsToStore: (token) => dispatch(requestApiQuestions(token)),
});

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  questionsToStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
