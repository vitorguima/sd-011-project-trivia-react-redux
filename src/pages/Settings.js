import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGameCategories } from '../actions';

/* import { connect } from 'react-redux'; */

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      level: '',
      nQuestions: '',
    };
  }

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories() {
    const { getCategories } = this.props;
    getCategories();
  }

  categoriesForm() {
    const { categories } = this.props || [];
    return (
      <form>
        <label htmlFor="questions">
          Escolha a quantidade de perguntas
          <input type="number" id="questions" />
        </label>
        <label>
          <select>
            {categories.map((category, index) => (<option value={ category.id } key={ index }>{category.name}</option>))}
          </select>
        </label>
      </form>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Link to="/">Voltar</Link>
        <h1 data-testid="settings-title">Settings</h1>
        {isLoading ? 'Carregando...' : this.categoriesForm()}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
