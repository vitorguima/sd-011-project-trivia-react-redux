import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import BtnSetupScreen from '../components/btnSetupScreen';
import fetchGravatar from '../services/GravatarApi';
import { sendGravatarSrcImg, sendQuestions } from '../redux/actions/index';
import InputName from '../components/InputName';
import InputEmail from '../components/InputEmail';
import PlayBtn from '../components/PlayBtn';
import { getToken, getQuestions } from '../services/TriviaApi';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      showImg: false,
      token: '',
      redirect: false,
    };
    this.handleOnChangeInputValidate = this.handleOnChangeInputValidate.bind(this);
    this.playHandle = this.playHandle.bind(this);
    this.showProfileImg = this.showProfileImg.bind(this);
    this.localStorageSave = this.localStorageSave.bind(this);
    this.getTokenAndQuestions = this.getTokenAndQuestions.bind(this);
  }

  componentDidMount() {
    this.getTokenAndQuestions();
    const button = document.querySelector('#play-btn');
    button.disabled = true;
  }

  async getTokenAndQuestions() {
    const { sendQuestionList } = this.props;
    const response = await getToken();
    const questions = await getQuestions(response);
    sendQuestionList(questions);
    this.setState({
      token: response,
    });
  }

  handleOnChangeInputValidate(e) {
    const name = document.querySelector('#inputName');
    const button = document.querySelector('#play-btn');
    const email = document.querySelector('#inputEmail');

    if (email.checkValidity() && email.value.length >= 1 && name.value.length >= 1) {
      button.disabled = false;
    } else if (
      !email.checkValidity()
      || name.value.length < 1
      || email.value.length < 1) {
      button.disabled = true;
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  async playHandle() {
    const { inputEmail, inputName, token } = this.state;
    const { sendImgSrc } = this.props;

    const hash = md5(inputEmail).toString();
    await fetchGravatar(hash);
    this.setState({
      showImg: true,
      imgHash: hash,
    });
    const src = `https://www.gravatar.com/avatar/${hash}.jpg`;
    sendImgSrc(inputName, src, inputEmail, token);
    this.localStorageSave();
    this.setState({
      redirect: true,
    });
  }

  localStorageSave() {
    const { inputEmail, inputName, token } = this.state;
    const player = {
      name: inputName,
      assertions: '',
      score: '',
      gravatarEmail: inputEmail,
    };
    localStorage.player = JSON.stringify(player);
    localStorage.token = JSON.stringify(token);
  }

  showProfileImg() {
    const { imgHash } = this.state;
    return (
      <img alt="profile img" src={ `https://www.gravatar.com/avatar/${imgHash}.jpg` } />
    );
  }

  render() {
    const { showImg, redirect } = this.state;

    if (redirect) return <Redirect to="/game" />;

    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <section className="login-container">
            <form className="login-form">
              <InputName func={ this.handleOnChangeInputValidate } />
              <InputEmail func={ this.handleOnChangeInputValidate } />
              <PlayBtn func={ this.playHandle } />
            </form>
            <BtnSetupScreen />
            { showImg ? this.showProfileImg() : '' }
          </section>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendImgSrc: (inputName, src, inputEmail, token) => (
    dispatch(sendGravatarSrcImg(inputName, src, inputEmail, token))),

  sendQuestionList: (questionList) => dispatch(sendQuestions(questionList)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendImgSrc: PropTypes.func,
  sendQuestionList: PropTypes.func,
};

Login.defaultProps = {
  sendImgSrc: {},
  sendQuestionList: {},
};
