import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import * as Icon from 'react-feather';

import './App.scss';
import Home from './components/home';

const history = require('history').createBrowserHistory;

function App() {
  return (
    <div className="App">

      <Router history={history}>
        <Route render={({location}) => (
          <div className="Almighty-Router">
            <Route exact path="/" render={() => <Redirect to="/" />} />
            <Route exact path="/" render={(props) => <Home {...props}/>} />
          </div>
        )}
        />
      </Router>
      <footer className="fadeInUp" style={{animationDelay: '2s'}}>
        <img src="/icon.png" alt="https://www.covid19india.org | Coronavirus cases live dashboard"/>
        <div className="link">
          Thank you to <a href="https://github.com/covid19india">covid19india</a>
        </div>
        <div id='footerButtons'>
          <a className="button" href="https://bit.ly/patientdb" target="_noblank">
            <Icon.Database /><span>Crowdsourced Patient Database&nbsp;</span>
          </a>
          <a href="https://bit.ly/covid19crowd" className="button telegram" target="_noblank">
            <Icon.MessageCircle />
            <span>Join Telegram to Collaborate!</span>
          </a>
        </div>
      </footer>

    </div>
  );
}

export default App;
