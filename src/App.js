import React from 'react';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import { Home, NotFound, TriviaGame } from './pages';
=======
import Settings from './components/Settings';
import { Home, NotFound, Game } from './pages';
>>>>>>> 6dd7913b3d2bfa2adef04be9c4b26f8cadf698fc

export default function App() {
  return (
    <main>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/game" render={(props) => <TriviaGame {...props} />} />
        <Route component={NotFound} />
=======
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
        <Route exact path="/settings" component={ Settings } />
        <Route component={ NotFound } />
>>>>>>> 6dd7913b3d2bfa2adef04be9c4b26f8cadf698fc
      </Switch>
    </main>
  );
}
