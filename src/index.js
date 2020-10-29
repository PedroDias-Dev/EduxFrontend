import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './pages/home';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import Objetivos from './pages/objetivos';
import Turmas from './pages/turmas';
import Ranking from './pages/ranking';
//import NaoEncontrada from './pages/not_found/index';
import gerenciarAluno from './pages/gerenciarAluno/index';
import NaoEncontrada from './pages/not_found/index';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const RotaPrivada = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = {
      props => 
      localStorage.getItem('token-edux') !== null ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

const routing = (
  <Router>
    <Switch>
      
      <Route path='/login'  component={Login} />
      <Route path='/cadastrar' component={Cadastrar} />
      <Route path='/objetivos' component={Objetivos} />
      <Route path='/turmas' component={Turmas} />
      <RotaPrivada exact path='/' component={Home} />
      <Route path='/gerenciarAluno' component={gerenciarAluno} />
      <Route path='/ranking' component={Ranking} />
      <Route component={NaoEncontrada} />
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
