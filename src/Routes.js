import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Quiz from './pages/Quiz';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/quiz" component={ Quiz } />
      </Switch>
    );
  }
}

export default Routes;
