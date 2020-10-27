import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './pages/home/index';
import Login from './pages/login/index';
import Cadastrar from './pages/cadastrar/index';
//import NaoEncontrada from './pages/not_found/index';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login'  component={Login} />
      <Route path='/cadastrar' component={Cadastrar} />
      {/* <Route component={NaoEncontrada} /> */}
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
