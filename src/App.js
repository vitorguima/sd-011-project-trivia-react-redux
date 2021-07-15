import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login } from './pages';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>

    </div>
  );
}
