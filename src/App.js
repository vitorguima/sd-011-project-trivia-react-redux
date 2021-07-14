import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaIncial from './Pages/TelaIncial';
import TelaDeJogo from './Pages/TelaDeJogo';
import TelaDeFeedback from './Pages/TelaDeFeedback';
import TelaDeRanking from './Pages/TelaDeRanking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ TelaIncial } />
      <Route exact path="/TelaDeJogo" component={ TelaDeJogo } />
      <Route exact path="/TelaDeFeedback" component={ TelaDeFeedback } />
      <Route exact path="/TelaDeRanking" component={ TelaDeRanking } />
    </Switch>
  );
}
