import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "./Avatar";

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  gravatarImage: state.loginReducer.gravatarImage,
});

const UserAvatar = connect(mapStateToProps)(Avatar);

export default UserAvatar;
// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
