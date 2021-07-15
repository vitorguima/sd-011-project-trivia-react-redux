import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaIncial from './Pages/TelaIncial';
import Play from './Pages/Play';
import Feedback from './Pages/TelaDeFeedback';
import Ranking from './Pages/TelaDeRanking';
import Settings from './Pages/Settings';

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