import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/game" component={ GamePage } />
        <Route exact path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default connect(null, null)(App);
