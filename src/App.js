import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Configurações from './pages/Configurações';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Configurações } />
      </Switch>
      {/* </BrowserRouter> */}
    </div>
  );
}
