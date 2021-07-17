import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchNewApi } from '../actions/requestAPI';

class WrongAnswer extends React.Component {
  componentDidMount() {
    const { recivedGameData } = this.props;
    recivedGameData();
    // console.log(gameData.results);
  }

  render() {
    const { array } = this.props;
    // const array = gameData.results;
    return (
      <div>
        {
          array && array.map((value, index) => (
            <p key={ index }>
              {value}
            </p>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.requestGameAPI.gameData,
});

const mapDispatchToProps = (dispatch) => ({
  recivedGameData: (state) => dispatch(fetchNewApi(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrongAnswer);

WrongAnswer.defaultProps = {
  gameData: {},
};

WrongAnswer.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
