import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import logo from './trivia.png';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/play" component={ Game } />
        </Switch>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            teste
          </p>
        </header>
      </div>
    );
  }
}
