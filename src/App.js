import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaIncial from './pages/TelaIncial';
import Play from './pages/Play';
import Feedback from './pages/TelaDeFeedback';
import Ranking from './pages/TelaDeRanking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ TelaIncial } />
        <Route exact path="/play" component={ Play } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>

  );
}
