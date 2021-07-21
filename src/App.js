import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './logo.png';
import './App.css';
import Login from './components/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header> */}
      <Switch>
        <Route path="/feedback" render={ () => <Feedback /> } />
        <Route path="/settings" render={ () => <Settings /> } />
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </div>
  );
}
