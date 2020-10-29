import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { url } from '../../utils/constants';
import './index.css'

const GerenciarAluno = () => {

    
    const [nome, setNome] = useState("");
    const [dataNascimento, setData] = useState("");
    
    useEffect(() => {
        listar();
    }, [])
    
    const listar = (event) => {
        fetch(`${url}/gerenciarAluno`)
        .then(response  => response.json())
        .then(dados => {
            setNome(dados.data);
        })
        .catch(err => console.error(err));
    }
    
    
    const cadastrar = (event) => {
        event.prevent.default();
    }

    return (
        
          <div>
     <Menu />

     <div className="container" >
            <div className="row">

                <div>
                <h1 style={{ fontSize: "2.3em", marginLeft: "30px" }}>Gerenciar Alunos</h1>
                </div>

                <div className="container">
                    <Form onSubmit={event => cadastrar(event)}>
                        <Form.Group controlId="formGerenciar">
                            <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Cadastre o aluno">
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" style={{marginBottom : "10px"}}>Cadastrar</Button>
                    </Form>
                </div>

                <div className="container">
                    <Form>
                        <Form.Group controlId="formGerenciar">
                            <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do Aluno"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" value={dataNascimento} onChange={event => setData(event.target.value)} placeholder="Data de nascimento do Aluno"></Form.Control>
                        </Form.Group>
                        <Button type="text">Buscar</Button>
                    </Form>
                </div>
        
                <div className="col">
                    <Table striped bordered variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Data de nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>André</td>
                                <td>11/02/2006</td>
                    
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Alice</td>
                                <td>16/04/2005</td>
                    
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Pedro</td>
                                <td>19/08/2006</td>
                             
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Pedro</td>
                                <td>09/10/2006</td>
                                
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Pedro</td>
                                <td>14/09/2005</td>
                            
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Pedro</td>
                                <td>28/06/2005</td>
                            
                            </tr>
                        </tbody>
                    </Table>
                </div>
                </div>
            <Rodape />
          </div>  
     </div>

        
    )
}

export default GerenciarAluno;