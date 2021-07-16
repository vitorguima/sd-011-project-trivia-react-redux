import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSettings } from '../redux/actions';
// amount=9 - número de perguntas

// categorias
// &category=10 - books
// &category=27 - animals
// &category=18 - computers
// &category=19 - mathematics
// &category=29 - comics
// &category=11 - movies

// dificuldade
// &difficulty=easy
// &difficulty=medium
// &difficulty=hard

// tipo de perguntas
// &type=multiple
// &type=boolean

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      type: '',
      questionsNumber: 5,
      difficulty: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  categoriesList() {
    return {
      Books: '&category=10',
      Animals: '&category=27',
      Computers: '&category=18',
      Mathematics: '&category=19',
      Comics: '&category=29',
      Movies: '&category=11',
    };
  }

  handleClick() {
    const { questionsNumber, type, category, difficulty } = this.state;
    const { userSettings } = this.props;
    let url = `https://opentdb.com/api.php?amount=${questionsNumber}`;
    if (type) url += type;
    if (category) url += category;
    if (difficulty) url += difficulty;
    url += '&token=';
    userSettings(url);
  }

  renderOptionsCategory(categories) {
    return (
      Object.keys(categories).map((cat, index) => (
        <option key={ index } value={ categories[cat] }>{cat}</option>
      ))
    );
  }

  render() {
    const { questionsNumber, type, category, difficulty } = this.state;
    const categories = this.categoriesList();
    const handler = this.handleChange;
    return (
      <div>
        <title data-testid="settings-title">Settings</title>
        <form>
          <label htmlFor="questionsNumber">
            Selecione o número de perguntas do jogo
            <input
              type="number"
              name="questionsNumber"
              value={ questionsNumber }
              onChange={ this.handleChange }
              min="5"
              max="20"
            />
          </label>
          <label htmlFor="category">
            Categoria
            <select id="category" onChange={ handler } name="category" value={ category }>
              {this.renderOptionsCategory(categories)}
            </select>
          </label>
          <label htmlFor="difficulty">
            Dificuldade
            <select
              onChange={ handler }
              id="difficulty"
              name="difficulty"
              value={ difficulty }
            >
              <option name="difficulty" value="&difficulty=easy">Easy</option>
              <option name="difficulty" value="&difficulty=medium">Medium</option>
              <option name="difficulty" value="&difficulty=hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Tipo de perguntas
            <select onChange={ handler } id="type" name="type" value={ type }>
              <option name="type" value="&type=multiple">Multiple Choice</option>
              <option name="type" value="&type=boolean">True / False</option>
            </select>
          </label>
          <button onClick={ this.handleClick } type="button">Salvar configurações</button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  userSettings: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) => ({
  userSettings: (url) => dispatch(changeSettings(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
