import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Login />
        <p>
          SUA VEZ
        </p>
        <GamePage />
      </header>
    </div>
  );
}
