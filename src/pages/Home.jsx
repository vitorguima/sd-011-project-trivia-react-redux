import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendInfo } from '../actions';
import { sendToken } from '../actions/tokenAction';
import LoginForm from '../components/LoginForm';
import getTriviaToken from '../services/trivia';

export default function Home() {
  const [login, setLogin] = useState({ email: '', name: '' });
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getToken = async () => {
      const tokenCode = await getTriviaToken();
      setToken(tokenCode.token);
    };

    getToken();
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendInfo(login));
    dispatch(sendToken(token));
    localStorage.setItem('token', token);
    history.push('game');
  };

  const handleDisabled = () => {
    const validRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
    );
    if (validRegex.test(login.email) && login.name.length > 0) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <LoginForm
        handleDisabled={ handleDisabled }
        handleSubmit={ handleSubmit }
        handleChange={ handleChange }
      />
    </div>
  );
}
