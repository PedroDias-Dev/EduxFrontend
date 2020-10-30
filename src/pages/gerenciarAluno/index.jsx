import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Form, Button, Table } from 'react-bootstrap';
import { url } from '../../utils/constants';
import './index.css'

const GerenciarAluno = () => {


    const [nome, setNome] = useState("");

    useEffect(() => {
        listar();
    }, [])

    const listar = (event) => {
        fetch(`${url}/gerenciarAluno`)
            .then(response => response.json())
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

                    <div className="containern">
                        <Form onSubmit={event => cadastrar(event)}>
                            <Form.Group controlId="formGerenciar">
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Cadastre o aluno">
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" style={{ marginBottom: "10px" }}>Cadastrar</Button>
                        </Form>
                    </div>

                    <div className="container">
                        <Form>
                            <Form.Group controlId="formGerenciar">
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do Aluno"></Form.Control>
                            </Form.Group>

                            <Form.Group>

                                <Form.Label style={{ color: "lavender", }}>Preference</Form.Label>

                                <Form inline>


                                    <Form.Control

                                        as="select"
                                        className="selecao"
                                        id="inlineFormCustomSelectPref"
                                        custom
                                    >
                                        <option value="0">Turmas...</option>
                                        <option value="1">1A</option>
                                        <option value="2">1B</option>
                                        <option value="3">2A</option>
                                    </Form.Control>
                                    <Form.Check
                                        style={{ color: "lavender", marginLeft: "25px", }}
                                        type="checkbox"
                                        className="my-1 mr-sm-2"
                                        id="customControlInline"
                                        label="Remember my preference"
                                        custom

                                    />
                                    <Button type="submit" className="my-1">
                                        Submit
                                    </Button>

                                </Form>

                            </Form.Group>

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