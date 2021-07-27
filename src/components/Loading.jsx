import React from 'react';
import style from './Loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <p className={ style.loading }>Carregando...</p>
    );
  }
}

export default Loading;
