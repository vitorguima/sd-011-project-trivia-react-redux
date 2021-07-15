import React, { Component } from 'react';
import Headerlogin from '../components/header'
// import { connect } from 'react-redux';
// import { requestApiThunk } from '../actions';

class TriviaQuestions extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(' ');
  // }

  // componentDidMount() {
  //   const token = '6700ac1d12b6846c9924b2138f513f9b3ab77a8ba4b63d4d0b4bcd5c6560734a';
  //   const { setStateGame } = this.props;
  //   setStateGame(token);
  // }

  render() {
    // const { questions } = this.props;
    const category = 'multiple';

    return (
      <div>
        <Headerlogin />
        <h1 data-testId="question-category">Categoria</h1>
        <h2 data-testId="question-text">Questão:</h2>
        {
          category === 'multiple' ? (
            <div>
              <button
                type="button"
                data-testid="{`wrong-answer-{index}`}"
              >
                Questão 1
              </button>
              <button
                type="button"
                data-testid="{`wrong-answer-{index}`}"
              >
                Questão 2
              </button>
              <button
                type="button"
                data-testid="{`wrong-answer-{index}`}"
              >
                Questão 3
              </button>
              <button
                type="button"
                data-testid="correct-answer"
              >
                Questão 4
              </button>
            </div>
          ) : (
            <div>
              <button type="button" data-testid="{`wrong-answer-{index}`}">
                verdadeiro
              </button>
              <button type="button" data-testid="correct-answer">
                falso
              </button>
            </div>
          )
        }
      </div>);
  }
}
export default TriviaQuestions;
// const mapDispatchToProps = (dispatch) => ({
//   setStateGame: (payload) => dispatch(requestApiThunk(payload)),
// });

// const mapStateToProps = (state) => ({
//   questions: state.fetchReducers.questions.results,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);
