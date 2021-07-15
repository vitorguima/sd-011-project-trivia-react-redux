import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  componentDidMount() {
    const { title } = this.props;
    document.title = `${title ? `${title} | ` : ''}Trivia 19`;
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <header>
          <h1>trivia 19</h1>
        </header>
        {children}
        <footer>
          <p>feito pelo grupo 19</p>
        </footer>
      </>
    );
  }
}

Layout.defaultProps = {
  title: null,
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,

};
