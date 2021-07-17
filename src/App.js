import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import TelaJogo from './pages/TelaJogo';
import Configurações from './pages/Configurações';
import { fetchNewApi } from './actions/requestAPI';

class App extends React.Component {
  componentDidMount() {
    const { recivedGameData } = this.props;
    recivedGameData();
  }

  render() {
    const { getdata, gameData } = this.props;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header> */}
        {/* <BrowserRouter> */}
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route path="/settings" render={ () => <Configurações /> } />
          <Route
            path="/game"
            render={ () => (
              <TelaJogo
                getdata={ getdata }
                gameData={ gameData }
              />) }
          />
        </Switch>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  recivedGameData: (state) => dispatch(fetchNewApi(state)),
});

const mapStateToProps = (state) => ({
  getdata: state.user.userData,
  gameData: state.requestGameAPI.gameData,
});

App.propTypes = ({
  recivedGameData: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(App);
