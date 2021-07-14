import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTokenThunk } from '../../actions';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const { getToken } = this.props;
    getToken();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { nome, email } = this.state;
      if (nome.length > 0 && email.length > 0) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  handleSubmit() {
    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', token);
  }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <div className="card-login">
        <input
          type="text"
          data-testid="input-player-name"
          name="nome"
          placeholder="Nome:"
          value={ nome }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <Link to="quiz">
          <button
            disabled={ isDisabled }
            data-testid="btn-play"
            type="button"
            onClick={ this.handleSubmit }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Card.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
