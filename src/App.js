import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import Game from './pages/Game';
=======
import Config from './pages/Config';
>>>>>>> a1b711f53f76227e3a4f32ba2a6c870188eecc0f

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
<<<<<<< HEAD
      <Route exact path="/game" component={ Game } />
=======
      <Route exact path="/config" component={ Config } />
>>>>>>> a1b711f53f76227e3a4f32ba2a6c870188eecc0f
    </Switch>
  );
}
