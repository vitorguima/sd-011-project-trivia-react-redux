import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import GamePage from './pages/GamePage';
import './style/App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route path="/settings" render={ () => <Configuracoes /> } />
        <Route path="/game" render={ () => <GamePage /> } />
      </Switch>
    </div>
  );
}
