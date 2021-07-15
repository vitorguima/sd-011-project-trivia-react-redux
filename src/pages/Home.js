import React, { Component } from 'react';
import Forms from '../components/Forms';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home__container">
        <h1>Home</h1>
        <Forms />
      </div>
    );
  }
}

export default Home;
