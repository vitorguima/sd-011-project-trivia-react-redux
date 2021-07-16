import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchGameCategories, setSettingsAction } from '../actions';

// MAGIC NUMBERS
const fiveQuestions = 5;
const fiftyQuestions = 50;

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      level: '',
      nQuestions: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  categoriesForm() {
    const { categories } = this.props;
    const { category, level, nQuestions } = this.state;
    return (
      <form>
        <label htmlFor="questions">
          Escolha a quantidade de perguntas
          <input
            value={ nQuestions > fiftyQuestions || nQuestions < fiveQuestions
              ? fiveQuestions : nQuestions }
            type="number"
            max="50"
            min="5"
            name="nQuestions"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="category">
          Escolha uma categoria
          <select
            value={ category }
            name="category"
            onChange={ (e) => this.handleChange(e) }
          >
            <option value="">Escolha uma categoria</option>
            {categories
              .map((item, index) => (
                <option value={ item.id } key={ index }>{item.name}</option>))}
          </select>
        </label>
        <label htmlFor="level">
          <select value={ level } name="level" onChange={ (e) => this.handleChange(e) }>
            <option value="">Escolha uma dificuldade</option>
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
      </form>
    );
  }

  render() {
    const { isLoading, setSettings } = this.props;
    return (
      <div>
        <Link to="/">
          <button type="button" onClick={ () => setSettings(this.state) }>Voltar</button>
        </Link>
        <h1 data-testid="settings-title">Settings</h1>
        {isLoading ? <p>Carregando...</p> : this.categoriesForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.gameReducer.categories.trivia_categories,
  isLoading: state.gameReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchGameCategories()),
  setSettings: (data) => dispatch(setSettingsAction(data)),
});

Settings.propTypes = {
  getCategories: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
