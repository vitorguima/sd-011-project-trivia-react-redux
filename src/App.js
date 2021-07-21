import React from 'react';
import { Switch, Route } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import TelaJogo from './pages/TelaJogo';
import Configurações from './pages/Configurações';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Configurações } />
        <Route path="/game" component={ TelaJogo } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
