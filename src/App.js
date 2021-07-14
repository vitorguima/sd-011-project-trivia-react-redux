import React from 'react';
import logo from './trivia.png';
import { Route } from 'react-router-dom';
import Play from './pages/Play';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Route path="/play" component={ Play }/>
      </header>
    </div>
  );
}
