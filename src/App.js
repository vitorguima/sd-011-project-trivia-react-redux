import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Settings from './components/Settings';
import Questions from './components/Questions';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/jogar" component={ Questions } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </header>
    </div>
  );
}
