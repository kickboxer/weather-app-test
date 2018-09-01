import React, { Component, Fragment } from 'react';
import FirstView from './components/FirstView';
import SecondView from './components/SecondView';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {
  MAIN,
  WEATHER_PAGE,
} from './constants/URLsCollections';

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path={MAIN} component={FirstView} />
          <Route exact path={WEATHER_PAGE} component={SecondView} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
