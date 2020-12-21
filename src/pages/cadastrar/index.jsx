import React, { useState } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import {Container, Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import './index.css';
import logo from '../../assets/img/logo_2.png'

const Cadastrar = () => {

    const history = useHistory();
    //const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    //const [permissao, setPermissao] = useState('');
    const [idPerfil, setIdPerfil] = useState('');


    const registrar = (event) => {
        event.preventDefault();

        fetch('http://localhost:55718/api/Usuario/',{
            method : 'POST',
            body : JSON.stringify({
                nome : nome,
                email : email,
                senha : senha,
                idPerfil : idPerfil
            }),
            headers : {
                'content-type' : 'application/json-patch+json'
            }
        })
        .then(response => {
            if(response.ok){
                alert('Tudo certo! Seu perfil foi cadastrado com sucesso!')
                history.push('/login');
                return response.json();
            }

            alert('Ocorreu um erro ao registrar. Tente novamente mais tarde.');
        })
        .then(data => {
            // localStorage.setItem('token-edux', data.token);

            // let usuario = jwt_decode(data.token);

            history.push('/login');
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
        <Menu />
        <Container className='form-height'>
                <Form className='form-signin' onSubmit={ event => registrar(event)}>
                    <div className='text-center'>
                     <img src={logo} alt='Logo EduX' style={{ width : '200px'}} />
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

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Perfil </Form.Label>
                        <Form.Control type="text" value={idPerfil} onChange={ event => setIdPerfil(event.target.value)} placeholder="Informe o ID de Perfil" required />
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