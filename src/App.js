import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
