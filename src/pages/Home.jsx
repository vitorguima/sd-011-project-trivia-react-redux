import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendInfo } from '../actions';
import LoginForm from '../components/LoginForm';

export default function Home() {
  const [login, setLogin] = useState({ email: '', name: '' });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendInfo(login));
    history.push('/carteira');
  };

  const handleDisabled = () => {
    const validRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    );
    if (validRegex.test(login.email)) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <LoginForm
        handleDisabled={handleDisabled}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
