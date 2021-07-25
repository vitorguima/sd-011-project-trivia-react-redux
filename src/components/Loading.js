import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <>
        <div className="loading">
          Loading Questions...
        </div>
        <div className="loading-circle" />
      </>
    );
  }
}

export default Loading;
