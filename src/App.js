import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Config from './pages/Config';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}
