import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Avatar.css';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 'loading' };
  }

  componentDidMount() {
    const { gravatarImage } = this.props;
    const image = new Image();

    image.onload = () => this.setState({ status: 'loaded' });
    image.onerror = () => this.setState({ status: 'error' });

    image.src = gravatarImage;
  }

  render() {
    const { status } = this.state;
    const { userName, gravatarImage } = this.props;

    if (status === 'loading') {
      return <div className="avatar-loading" />;
    }

    if (status === 'error') {
      return (
        <img className="avatar-image" src="/assets/aang.png" alt={userName} />
      );
    }

    return (
      <img
        className="avatar-image"
        data-testid="header-profile-picture"
        src={gravatarImage}
        alt={userName}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  gravatarImage: state.loginReducer.gravatarImage,
});

Avatar.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Avatar);

// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
