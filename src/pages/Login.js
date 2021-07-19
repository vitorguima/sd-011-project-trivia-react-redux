import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  componentDidMount() {
    localStorage.removeItem('state');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <LoginForm />
    );
  }
}
