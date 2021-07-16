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
    return (
      <form>
        <input type="text" />
      </form>
    );
  }

  render() {
    return (
      <div>
        <Link to="/">Voltar</Link>
        <h1 data-testid="settings-title">Settings</h1>
        {this.categoriesForm()}
      </div>
    );
  }
}

/* const mapStateToProps = (state) => ({
  logInfo: state.pageReducer.logged,
}); */

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchGameCategories()),
});

export default connect(null, mapDispatchToProps)(Settings);
