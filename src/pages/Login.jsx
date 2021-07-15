import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/login/Header';
import CardLogin from '../components/login/Card';
import '../style/login.css';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <CardLogin />
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
