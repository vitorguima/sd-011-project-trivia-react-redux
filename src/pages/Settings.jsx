import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCategory } from '../services/api';
import { actionCategory } from '../actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: true,
    };
    this.setCategories = this.setCategories.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  async setCategories() {
    const categories = await fetchCategory();
    // const categories = data.map((category) => category.name);
    this.setState({ categories, loading: false });
  }

  chooseCategory({ target: { value } }) {
    const { setCategory } = this.props;
    setCategory(value);
  }

  render() {
    const { loading, categories } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <label htmlFor="categories">
          Categories
          <select name="categories" id="categories" onChange={ this.chooseCategory }>
            { categories.map((category, index) => (
              <option
                key={ index }
                onChange={ this.chooseCategory }
                value={ category.id }
              >
                {category.name}
              </option>))}
          </select>
        </label>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const MapDispatchToProps = (dispatch) => ({
  setCategory: (category) => dispatch(actionCategory(category)),
});

Settings.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default connect(null, MapDispatchToProps)(Settings);
