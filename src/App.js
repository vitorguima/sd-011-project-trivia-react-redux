import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
