import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import Game from './page/Game';
import Settings from './page/Settings';
import Feedback from './page/Feedback';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/jogar" component={ Game } />
        <Route path="/configuração" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </BrowserRouter>
  );
}
