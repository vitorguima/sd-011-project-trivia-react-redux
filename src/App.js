import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Game from './components/Game';
import Settings from './components/Settings';

import './App.css';
import Feedback from './components/Feedback';

export default function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/feedback" component={ Feedback } />
    </div>
  );
}
