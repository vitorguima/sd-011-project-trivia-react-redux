import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './components/Login';
import GamePlay from './pages/GamePlay';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/gameplay" component={ GamePlay } />
            <Route exact path="/settings" component={ Settings } />
          </Switch>
        </div>
      </header>
    </div>
  );
}
