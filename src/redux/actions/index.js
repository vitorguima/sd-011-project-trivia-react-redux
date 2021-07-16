const SEND_GRAVATAR_SRC_IMG = 'SEND_GRAVATAR_SRC_IMG';
const SEND_QUESTIONS = 'SEND_QUESTIONS';

function sendGravatarSrcImg(name, src, email, token) {
  return {
    type: SEND_GRAVATAR_SRC_IMG,
    name,
    src,
    email,
    token,
  };
}

function sendQuestions(questions) {
  return {
    type: SEND_QUESTIONS,
    questions,
  };
}

export {
  SEND_GRAVATAR_SRC_IMG,
  sendGravatarSrcImg,
  SEND_QUESTIONS,
  sendQuestions,
};
