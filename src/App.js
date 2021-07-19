import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Config from './pages/Config';
import Feedbacks from './pages/Feedbacks';
import Ranking from './pages/Ranking';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/feedbacks" component={ Feedbacks } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
