import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../images/back_4.png';

class About extends Component {
  constructor(props) {
    super(props);
    this.HomeBtnRender = this.HomeBtnRender.bind(this);
  }

  HomeBtnRender() {
    return (
      <Link to="/" style={ { textDecoration: 'none' } }>
        <div className="setup-back-home">
          <img src={ back } alt="Voltar" className="back-img-home" />
          <button
            type="button"
            className="btn-neon-blue back-home"
          >
            Voltar ao Login
          </button>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <h1>Olá, somos do Grupo 28 [UNNAMED] da escola Trybe! #BeTrybe</h1>
        <h2>Nosso time se compõem pelos seguintes integrantes:</h2>
        <h2>
          - Marcos Mantovani
          <br />
          - Diogo Augusto
          <br />
          - Johnata Pontes
          <br />
          - Camilo Lelis
        </h2>
        <br />
        <br />
        <h3 className="about-description">
          Neste projeto testamos nossos conhecimentos referente a
          Redux e tudo oque vimos em FrontEnd!
        </h3>
        <h3 className="about-description">
          Realmente foi um desafio fazer uma aplicação como essa a prova de bugs
          e tentar ao máximo deixar o código limpo, legível e ainda conseguir
          ficar de bem com o Evaluator.
        </h3>
        <h3 className="about-description">
          Estamos muito Orgulhosos com o resultado!
        </h3>
        <h3 className="about-description">
          Esperamos que você possa se divertir com nossa aplicação/Game,
          Tenha um bom jogo!
        </h3>

        <h1 className="about-description">
          o Texto acima é um exemplo do que podemos colocar aqui nesta página!
          <br />
          dem suas opniões para definirmos em conjunto oque colocar aqui Sobre
          o nosso Grupo!
        </h1>
        { this.HomeBtnRender() }
      </div>
    );
  }
}

export default About;
