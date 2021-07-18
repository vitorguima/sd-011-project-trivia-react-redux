import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './components/Login';
import GamePlay from './pages/GamePlay';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <Switch>
            <Route exact path="/" render={ (props) => <Login { ...props } /> } />
            <Route path="/gameplay" render={ (props) => <GamePlay { ...props } /> } />
            <Route exact path="/settings" component={ Settings } />
            <Route path="/feedback" component={ Feedback } />
          </Switch>
        </div>
      </header>
    </div>
  );
}
