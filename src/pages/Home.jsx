/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchToken, fetchUser } from '../services/LoginAPI';
import LoginPage from '../components/LoginPage';

export default function Home() {
  const [login, setLogin] = useState({ email: '', name: '' });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchToken();
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUser(login));

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

    <LoginPage
      handleDisabled={ handleDisabled }
      handleSubmit={ handleSubmit }
      handleChange={ handleChange }
    />

  );
}
