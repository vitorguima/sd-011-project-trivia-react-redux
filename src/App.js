import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import Feedback from './pages/FeedBack';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import './style/App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" render={ () => <GamePage /> } />
        <Route path="/feedback" render={ () => <Feedback /> } />
        <Route path="/settings" render={ () => <Configuracoes /> } />
        <Route exact path="/" render={ () => <Login /> } />
      </Switch>
    </div>
  );
}
