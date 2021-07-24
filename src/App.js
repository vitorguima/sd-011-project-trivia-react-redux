import React from 'react';
import { Switch, Route } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          <Route patch="/feedback" component={ Feedback } />
        </Switch>
      </div>
    </div>
  );
}
