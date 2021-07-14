import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import logo from './trivia.png';
// <img src={ logo } className="App-logo" alt="logo" />

import Login from './components/Login';
import Config from './components/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
    </Switch>
  );
}
