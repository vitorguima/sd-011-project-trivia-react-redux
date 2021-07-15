import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaInicial from './Pages/Inicial';
import Play from './Pages/Play';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ TelaInicial } />
        <Route exact path="/Play" component={ Play } />
        <Route exact path="/Feedback" component={ Feedback } />
        <Route exact path="/Ranking" component={ Ranking } />
        <Route exact path="/Settings" component={ Settings } />
      </Switch>
     </div>

  );
}
