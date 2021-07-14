import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
// import logo from './trivia.png';
// <img src={ logo } className="App-logo" alt="logo" />

import Login from './components/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Header } />
    </Switch>
  );
}
