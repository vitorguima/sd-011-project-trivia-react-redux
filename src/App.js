import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import Game from './components/Game';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}

export default App;
