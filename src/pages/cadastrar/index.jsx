import React, { useState } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import {Container, Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

import './index.css';
import logo from '../../assets/img/logo_2.png'

import jwt_decode from 'jwt-decode';

const Cadastrar = () => {

    const history = useHistory();
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [permissao, setPermissao] = useState('');

    const registrar = (event) => {
        event.preventDefault();

        fetch('http://localhost:62602/api/register',{
            method : 'POST',
            body : JSON.stringify({
                nome : nome,
                email : email,
                senha : senha,
                permissao : permissao
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }

            alert('Ocorreu um erro ao registrar. Tente novamente mais tarde.');
        })
        .then(data => {
            localStorage.setItem('token-edux', data.token);

            let usuario = jwt_decode(data.token);

            if(usuario.role === 'Admin')
                history.push('/admin/dashboard');
            else
                history.push('/');
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
        <Menu />
        <Container className='form-height'>
                <Form className='form-signin' >
                    <div className='text-center'>
                     <img src={logo} alt='EduX' style={{ width : '200px'}} />
                    </div>
                    <br/>
                    <small>Informe os dados Abaixo</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome </Form.Label>
                        <Form.Control type="nome" value={nome} onChange={ event => setNome(event.target.value)} placeholder="Nome Completo" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" value={email} onChange={ event => setEmail(event.target.value)} placeholder="Informe o email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={senha} onChange={ event => setSenha(event.target.value)} placeholder="Senha"  required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select" size="lg" custom onChange={event => setPermissao(event.target.value)} >
                                    <option value={1}>Professor</option>
                                    <option value={2}>Aluno</option>

                                </Form.Control>
                            </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href='/login' style={{ marginTop :'30px'}}>Já tenho conta!</a>
                </Form>
            </Container>
        <Rodape />
        </div>
    )
}

export default Cadastrar