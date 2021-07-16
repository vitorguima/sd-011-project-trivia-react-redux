import React, { Component } from 'react';
import md5 from 'crypto-js/md5'; 

class Feedback extends Component {
	render() {
		const store = JSON.parse(localStorage.getItem("state"))
		const email = md5(store.player.gravatarEmail).toString()
		console.log(email)
		return (
			<div>
				<header>
				<img src={`https://www.gravatar.com/avatar/${email}`}  data-testid="header-profile-picture"/>
					<span data-testid="header-player-name">{store.player.name}</span>
					<span data-testid="header-score">{store.player.score}</span>
				</header>
				<span data-testid="feedback-text">

				</span>
			</div>
		);
	}
}

export default Feedback;
