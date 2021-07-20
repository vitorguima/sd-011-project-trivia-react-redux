import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/api';
import Loading from '../components/Loading';
import { updateCategory } from '../actions';

class Configuration extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      categories: [],
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  async setCategories() {
    const categories = await fetchCategories();

    this.setState({
      isLoading: false,
      categories,
    });
  }

  render() {
    const { isLoading, categories } = this.state;
    const { category, dispatchUpdateCategory } = this.props;

    if (isLoading) return <Loading />;

    return (
      <section>
        <h1
          data-testid="settings-title"
        >
          Configurações
        </h1>
        <select
          name="category"
          id="category"
          value={ category }
          onChange={ ({ target: { value } }) => dispatchUpdateCategory(Number(value)) }
        >
          <option value={ 0 }>All categories</option>
          {
            categories.map(({ id, name }) => (
              <option key={ id } value={ id }>{name}</option>
            ))
          }
        </select>
        <Link to="/">
          Voltar
        </Link>
      </section>
    );
  }
}

const mapStateToProps = ({ configurationReducer: { category } }) => ({
  category,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateCategory: (categoryId) => dispatch(updateCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);

Configuration.propTypes = {
  category: PropTypes.number,
  dispatchUpdateCategory: PropTypes.func,
}.isRequired;
