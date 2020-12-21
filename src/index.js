import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/home';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import Objetivos from './pages/adm/crudobjetivos/index';
import DicasAdm from './pages/adm/cruddicas/index';
import Gerenciar from './pages/adm/crudgerenciar/index';
import Turmas from './pages/turmas';
import Dicas from './pages/dicas';
import Ranking from './pages/ranking';
import gerenciarAluno from './pages/gerenciarAluno/index';
import NaoEncontrada from './pages/not_found/index';
import Unauthorized from './pages/unauthorized/index';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
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


const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = {
      props => 
      localStorage.getItem('token-edux') !== null && jwt_decode(localStorage.getItem('token-edux')).role === 'Professor' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/401', state :{from : props.location}}} /> 
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route path='/login'  component={Login} />
      <Route path='/cadastrar' component={Cadastrar} />
      <RotaPrivadaAdmin path='/adm/crudobjetivos' component={Objetivos} />
      {/* <RotaPrivadaAdmin path='/adm/dicas' component={DicasAdm} /> */}
      <Route path='/adm/dicas' component={DicasAdm} />
      <RotaPrivadaAdmin path='/adm/alunos' component={Gerenciar} />
      <Route path='/turmas' component={Turmas} />
      <Route path='/dicas' component={Dicas} />
      <RotaPrivada exact path='/' component={Home} />
      <Route path='/' exact component={Home} />
      <Route path='/gerenciarAluno' component={gerenciarAluno} />
      <Route path='/ranking' component={Ranking} />
      <Route path='/401' component={Unauthorized} />
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
