import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
