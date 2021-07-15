import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Trivia from './pages/Trivia';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

// const mapStateToProps = (state) => ({
//   logInfo: state.pageReducer.logged,
// })

// const mapDispatchToProps = (dispatch) => ({
//   logoff: () => dispatch(logoffAction())
// })

export default connect(null, null)(App);
