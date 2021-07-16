import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { requestToken } from '../../actions';

const SendButtonLogin = (props) => {
  const { stateLogin } = props;
  const { email, userName } = stateLogin;
  const dispatch = useDispatch();
  const history = useHistory();
  const validateEmailInput = () => {
    if (email !== '' && userName !== '') {
      return false;
    } return true;
  };
  const sendLogin = () => {
    dispatch(requestToken(userName, email));
    history.push('/game');
  };
  return (
    <button
      type="button"
      data-testid="btn-play"
      onClick={ sendLogin }
      disabled={ validateEmailInput() }
    >
      Iniciar Jogo
    </button>
  );
};

export default SendButtonLogin;

SendButtonLogin.propTypes = {
  stateLogin: PropTypes.shape({
    email: PropTypes.string,
    userName: PropTypes.string,
  }).isRequired,
};
