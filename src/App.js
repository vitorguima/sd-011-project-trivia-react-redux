import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login';
import Header from './pages/header';
import Configuration from './pages/configuration';

export default function App() {
  return (
    <Switch>
      <Route path="/configuration" component={ Configuration } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/header" component={ Header } />
    </Switch>
  );
}
