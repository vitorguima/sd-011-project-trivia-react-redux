import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Configurations from './pages/Configurations';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/configurations" component={ Configurations } />
      <Route exact path="/play" component={ Game } />
    </Switch>
  );
}
