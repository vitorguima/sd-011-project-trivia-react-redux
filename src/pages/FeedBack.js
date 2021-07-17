import React, { Component } from 'react';
import Header from '../components/Header';
import MSGFeedBack from '../components/MSGFeedBack';

export default class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <MSGFeedBack />
      </div>
    );
  }
}
