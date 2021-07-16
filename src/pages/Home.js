import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Forms from '../components/Forms';
import '../CSS/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home__container">
        <h1>Home</h1>
        <Forms />
        <Link to="/settings" data-testid="btn-settings">settings</Link>
      </div>
    );
  }
}

export default Home;
