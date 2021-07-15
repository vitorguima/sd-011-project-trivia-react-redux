import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Inicial from './Pages/Inicial';
import Play from './Pages/Play';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Inicial } />
      <Route exact path="/Play" component={ Play } />
      <Route exact path="/Feedback" component={ Feedback } />
      <Route exact path="/Ranking" component={ Ranking } />
      <Route exact path="/Settings" component={ Settings } />
    </Switch>
  );
}
