import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
