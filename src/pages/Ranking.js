import React, { Component } from 'react'
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

export default class Ranking extends Component {
    
    getPlayer(){
        const getPlayerByLocal = JSON.parse(localStorage.getItem('ranking'))
        let getEmail = getPlayerByLocal.map((players) => players.gravatarEmail)
        console.log(getEmail)
        
        
    }

    render() {

        return (
            <div>
                <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/` } alt="avatar" />
            </div>
        )
    }
}


