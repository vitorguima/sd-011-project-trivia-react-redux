import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaIncial from './Pages/TelaIncial';
import Play from './Pages/Play';
import TelaDeFeedback from './Pages/TelaDeFeedback';
import TelaDeRanking from './Pages/TelaDeRanking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ TelaIncial } />
      <Route exact path="/Play" component={ Play } />
      <Route exact path="/Feedback" component={ TelaDeFeedback } />
      <Route exact path="/Ranking" component={ TelaDeRanking } />
    </Switch>
  );
}
