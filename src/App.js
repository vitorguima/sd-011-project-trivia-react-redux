import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Jogo from './pages/Jogo';
import Ranking from './pages/Ranking';
import './App.css';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Config } />
      <Route path="/jogo" component={ Jogo } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
