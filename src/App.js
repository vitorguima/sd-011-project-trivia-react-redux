import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import './styles/App.css';
import GameScreen from './components/GameScreen';

import Login from './components/Login';
import Config from './components/Config';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ GameScreen } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Header } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
