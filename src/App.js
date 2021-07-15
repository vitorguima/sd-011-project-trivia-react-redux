import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import PlayGame from './pages/PlayGame';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/PlayGame" component={ PlayGame } />
    </Switch>
  );
}
