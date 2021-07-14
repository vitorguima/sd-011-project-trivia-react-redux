import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, NotFound } from './pages';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}
