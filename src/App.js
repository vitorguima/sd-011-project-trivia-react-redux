import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import GameScreen from './pages/GameScreen';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ GameScreen } />
      </Switch>
    </div>
  );
}

// segunda tentativa requisitos 5,6,7 e 8
