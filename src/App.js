import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login from './pages/login';
import config from './pages/config';
import screenGame from './pages/screenGame';
import feedback from './pages/feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/config" component={ config } />
      <Route path="/screen-game" component={ screenGame } />
      <Route path="/feedback" component={ feedback } />
    </Switch>
  );
}
