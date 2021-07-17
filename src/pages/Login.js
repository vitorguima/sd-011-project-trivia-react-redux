import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  componentDidMount() {
    localStorage.clear('state');
  }

  render() {
    return (
      <LoginForm />
    );
  }
}
