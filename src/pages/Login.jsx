import React from 'react';
import Header from '../components/login/Header';
import CardLogin from '../components/login/Card';
import '../style/login.css';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <CardLogin />
      </div>
    );
  }
}

export default Login;
