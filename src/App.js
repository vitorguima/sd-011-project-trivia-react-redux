import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import Game from './page/Game';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/jogar" component={ Game } />
      </Switch>
    </BrowserRouter>
  );
}
