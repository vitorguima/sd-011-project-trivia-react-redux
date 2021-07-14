import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import TriviaQuestions from './pages/triviaQuestions';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
      <TriviaQuestions />
      <div />
    </>

  );
}
