import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <img src={ logo } className="App-logo" alt="logo" />
        <Login />
        <Switch>
          <Route path="/settings" component={ Settings } />
          <Route path="/gamePage" component={ GamePage } />
        </Switch>
        <p>
          SUA VEZ
        </p>
      </header>
    </div>
  );
}
