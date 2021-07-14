import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}

export default App;
