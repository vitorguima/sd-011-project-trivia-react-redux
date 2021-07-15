import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiQuestions } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    const { questionsToStore } = this.props;
    const token = localStorage.getItem('token');
    questionsToStore(token);
  }

  render() {
    const { userName, gravatarImage, questions } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt={ `Foto de ${userName}` }
          />
          <p data-testid="header-player-name">{ `Nome do usuário: ${userName}` }</p>
          <p data-testid="header-score">0</p>
        </header>
        { console.log(questions[0]) }
        {(questions[0])
          ? (
            <div>
              <div data-testid="question-category">
                { questions[0].category }
              </div>
              <div data-testid="question-text">
                { questions[0].question }
              </div>
              <div>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  { questions[0].correct_answer }
                </button>
                { questions[0].incorrect_answers.map((answer, index) => (
                  <button
                    type="button"
                    key={ index }
                    data-testid={ `wrong-answer-${index}` }
                  >
                    { answer }
                  </button>
                )) }
              </div>
            </div>
          )
          : (
            <div>Loading...</div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsToStore: (token) => dispatch(requestApiQuestions(token)),
});

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
  questions: state.questionsReducer.results,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  questionsToStore: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  }),
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
