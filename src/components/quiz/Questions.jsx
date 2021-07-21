import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestionsThunk } from '../../actions';
import ButtonNext from './ButtonNext';
import Answers from './Answers';
import Loading from '../general/Loading';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      indexQuestion: 0,
      shuffledAnswers: [],
      endGame: false,
      buttonDisabled: false,
      timerCountDown: 30,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startTime = this.startTime.bind(this);
    this.handleButtons = this.handleButtons.bind(this);
    this.updateCountdown = this.updateCountdown.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  async componentDidMount() {
    await this.fetchTrivia();
    const timerDecrease = 1000;
    setInterval(this.updateCountdown, timerDecrease);
    this.shuffleAnswers();
  }

  nextQuestion() {
    this.setState((currentState) => {
      const finalArray = 3;
      if (currentState.indexQuestion < finalArray) {
        return {
          indexQuestion: currentState.indexQuestion + 1,
          hasAnswered: false,
          timerCountDown: 30,
        };
      }
      return {
        indexQuestion: currentState.indexQuestion + 1,
        endGame: true,
        hasAnswered: false,
        timerCountDown: 30,
      };
    }, () => this.shuffleAnswers());
    this.handleButtons(false);
  }

  async fetchTrivia() {
    const { token, getQuestions } = this.props;
    await getQuestions(token);
    const { questions } = this.props;
    this.setState({
      questionsList: questions,
    }, () => this.startTime());
  }

  handleButtons(disabled) {
    this.setState({
      buttonDisabled: disabled,
    });
  }

  startTime() {
    const timer = 30000;
    setTimeout(() => this.handleButtons(true), timer);
  }

  updateCountdown() {
    const { timerCountDown } = this.state;
    this.setState({
      timerCountDown: timerCountDown - 1,
    });
  }

  shuffleAnswers() {
    const { questionsList, indexQuestion } = this.state;
    if (questionsList.length !== 0) {
      const questionAnswers = [questionsList[indexQuestion].correct_answer,
        ...questionsList[indexQuestion].incorrect_answers];
      for (let indexStandard = questionAnswers.length - 1;
        indexStandard > 0; indexStandard -= 1) {
        const indexToSwap = Math.floor(Math.random() * (indexStandard + 1));
        [questionAnswers[indexStandard], questionAnswers[indexToSwap]] = [
          questionAnswers[indexToSwap], questionAnswers[indexStandard]];
      }
      this.setState({
        shuffledAnswers: questionAnswers,
      });
    }
  }

  render() {
    const { loading } = this.props;
    const { questionsList, indexQuestion, endGame, buttonDisabled,
      timerCountDown, shuffledAnswers } = this.state;
    if (!loading && questionsList.length !== 0) {
      return (
        <div className="card-question-quiz">
          <div className="info-question-quiz">
            <p data-testid="question-text">{ questionsList[indexQuestion].question }</p>
            <p data-testid="question-category">
              { questionsList[indexQuestion].category }
            </p>
          </div>
          <Answers
            handleButtons={ this.handleButtons }
            timer={ timerCountDown }
            questionsList={ questionsList[indexQuestion] }
            shuffledAnswers={ shuffledAnswers }
            isDisabled={ buttonDisabled }
          />
          { !endGame ? <ButtonNext
            btnState={ buttonDisabled }
            testid="btn-next"
            nextQuestion={ this.nextQuestion }
          />
            : (
              <Link to="/feedback">
                <ButtonNext btnState={ buttonDisabled } testid="btn-next" />
              </Link>)}
        </div>
      );
    }
    return (<Loading />);
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  questions: state.questions.questions,
  loading: state.questions.loading,
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
