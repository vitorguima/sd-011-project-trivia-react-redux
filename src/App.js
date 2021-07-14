import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>Agora sua vez</p>
        <Switch>
          <Route exact path="/" component={ <App /> } />
        </Switch>
      </header>
    </div>
  );
}
