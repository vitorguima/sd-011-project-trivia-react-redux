import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from './components/Settings';
import { Home, NotFound, Game, Feedback } from './pages';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" render={ (props) => <Feedback { ...props } /> } />
        <Route component={ NotFound } />
      </Switch>
    </main>
  );
}
