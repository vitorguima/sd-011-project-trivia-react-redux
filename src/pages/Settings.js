import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { questionSettings } from '../actions/settings';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      difficulty: '',
      type: '',
      selectedCategory: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    const URL = 'https://opentdb.com/api_category.php';
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data.trivia_categories }))
      .catch((error) => error);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderCategories() {
    const { categories } = this.state;
    return (
      <label htmlFor="selectedCategory">
        <select
          id="selectedCategory"
          name="selectedCategory"
          onChange={ this.handleChange }
        >
          <option>Any category</option>
          { categories.map(({ id, name }, index) => (
            <option
              value={ id }
              key={ index }
            >
              { name }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderDifficulty() {
    return (
      <label htmlFor="difficulty">
        <select
          id="difficulty"
          name="difficulty"
          onChange={ this.handleChange }
        >
          <option value="">Any difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Hard</option>
        </select>
      </label>
    );
  }

  renderType() {
    return (
      <label htmlFor="type">
        <select
          id="type"
          name="type"
          onChange={ this.handleChange }
        >
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </label>
    );
  }

  render() {
    const { saveSettings } = this.props;
    const { selectedCategory, type, difficulty } = this.state;
    return (
      <>
        <header data-testid="settings-title">
          Settings
        </header>
        <form className="settings-form">
          <h2>Customize your game</h2>
          { this.renderCategories() }
          { this.renderDifficulty() }
          { this.renderType() }
          <span className="settings-buttons">
            <button
              type="button"
              onClick={ () => saveSettings({ selectedCategory, type, difficulty }) }
            >
              Save Settings
            </button>
            <Link to="/">
              <button
                className="home-button"
                type="button"
              >
                Home
              </button>
            </Link>
          </span>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (settings) => dispatch(questionSettings(settings)),
});

export default connect(null, mapDispatchToProps)(Settings);

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired,
};
