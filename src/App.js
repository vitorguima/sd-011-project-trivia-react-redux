import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </BrowserRouter>
  );
}
