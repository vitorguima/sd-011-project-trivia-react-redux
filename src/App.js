import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Setting from './pages/Settings';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Setting } />
      <Route path="/trivia" component={ Trivia } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
