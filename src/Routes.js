import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, Feedback, Quiz, Ranking, Setting } from './pages';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/quiz" component={ Quiz } />
        <Route path="/settings" component={ Setting } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;
