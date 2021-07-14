import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, NotFound, TriviaGame } from './pages';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/game" render={(props) => <TriviaGame {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}
