import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="/game" render={ () => <Game /> } />
        </Switch>
      </header>
    </div>
  );
}
