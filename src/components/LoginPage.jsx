import React from 'react';
import '../styles/LoginPage.css';
import Form from './Form';

const URL = 'https://e7.pngegg.com/pngimages/716/486/png-clipart-100-pics-quiz-guess-the-trivia-games-history-quiz-game-quiz-guess-word-quiz-up-2k17-trivia-history-quiz-game-logo-thumbnail.png';

export default function LoginPage(props) {
  return (
    <div className="container bootstrap snippets bootdey">
      <div className="header">
        <h3 className="text-muted prj-name">Project Trivia Game</h3>
      </div>
      <div className="jumbotron style1">
        <div className="col-md-4">
          <img className="img-responsive center-block img-user" src={ URL } alt="" />
        </div>
        <div className="col-md-6 form-content">
          <Form { ... props } />
        </div>
      </div>
    </div>
  );
}
