import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestionsThunk } from '../../actions';
import ButtonNext from './ButtonNext';
import ButtonQuestion from './ButtonQuestion';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      indexQuestion: 0,
      endGame: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchTrivia();
  }

  nextQuestion() {
    this.setState((currentState) => {
      const finalArray = 4;
      if (currentState.indexQuestion < finalArray) {
        return {
          indexQuestion: currentState.indexQuestion + 1,
        };
      }
      return {
        endGame: true,
      };
    });
  }

  async fetchTrivia() {
    const { token, getQuestions } = this.props;
    await getQuestions(token);
    const { questions } = this.props;
    this.setState({
      questionsList: questions,
    });
  }

  render() {
    const { loading } = this.props;
    const { questionsList, indexQuestion, endGame } = this.state;
    if (!loading && questionsList.length !== 0) {
      return (
        <div>
          <div>
            <p data-testid="question-text">{ questionsList[indexQuestion].question }</p>
            <p
              data-testid="question-category"
            >
              { questionsList[indexQuestion].category }
            </p>
          </div>
          <ul>
            <li>
              <button data-testid="correct-answer" type="button">
                { questionsList[indexQuestion].correct_answer }
              </button>
              { questionsList[indexQuestion].incorrect_answers.map((wrong, index) => (
                <ButtonQuestion
                  key={ index }
                  testid={ `wrong-answer-${index}` }
                  wrong={ wrong }
                />
              )) }
            </li>
          </ul>

          { !endGame ? <ButtonNext testid="btn-next" nextQuestion={ this.nextQuestion } />
            : (
              <Link to="/feedback">
                <ButtonNext testid="btn-next" />
              </Link>)}

        </div>
      );
    }
    return (<p>LOADING...</p>);
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
