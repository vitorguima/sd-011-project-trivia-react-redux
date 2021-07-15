import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaIncial from './pages/TelaIncial';
import Play from './pages/Play';
import Feedback from './pages/Feedback';
import Ranking from './pages/TelaDeRanking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ TelaIncial } />
      <Route exact path="/Play" component={ Play } />
      <Route exact path="/Feedback" component={ Feedback } />
      <Route exact path="/Ranking" component={ Ranking } />
      <Route exact path="/Settings" component={ Settings } />
    </Switch>
  );
}