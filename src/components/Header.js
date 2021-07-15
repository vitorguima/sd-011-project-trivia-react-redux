import React from 'react';
import md5 from 'crypto-js/md5';

const email = md5('email@email.com').toString();
console.log(email);

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="header">
        <div className="gravatar">
          <img
            src={`https://www.gravatar.com/avatar/${email}`}
            alt="imagem gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div class="name">
          <h4 data-testid="header-player-name">{'Xablau'}</h4>
        </div>
        <div className="score">
          <h4 data-testid="header-score">{0}</h4>
        </div>
      </div>
    );
  }     
}

export default Header;