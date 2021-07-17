import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import FeedBack from './pages/FeedBack';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
