import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route path="/settings" render={ () => <Settings /> } />
          <Route path="/game" render={ () => <Game /> } />
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        </Switch>
      </header>
    </div>
  );
}
