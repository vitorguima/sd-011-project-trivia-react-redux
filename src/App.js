import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';
import Configuracao from './pages/Configuracao';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configuracao" component={ Configuracao } />
      </Switch>
    </div>
  );
}
