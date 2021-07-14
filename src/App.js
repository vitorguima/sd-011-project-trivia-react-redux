import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Player from './components/player';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/player" component={ Player } />
    </Switch>
  );
}
