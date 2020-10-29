import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Form, Button, Table } from 'react-bootstrap';
import { url } from '../../utils/constants';
// import './index.css'

const Ranking = () => {


    const [nome, setNome] = useState("");
    

    useEffect(() => {
        listar();
    }, [])

    const listar = (event) => {
        fetch(`${url}/ranking`)
            .then(response => response.json())
            .then(dados => {
                setNome(dados.data);
            })
            .catch(err => console.error(err));
    }


    // const cadastrar = (event) => {
    //     event.prevent.default();
    // }

    return (

        <div>
            <Menu />

            <div className="container" >
                <div className="row">

                    <div>
                        <h1 style={{ fontSize: "2.3em", marginLeft: "20px" }}>Ranking Geral</h1>
                    </div>

                    {/* <div className="container">
                    <Form onSubmit={event => cadastrar(event)}>
                        <Form.Group controlId="formRanking">
                            <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Cadastre o aluno">
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" style={{marginBottom : "10px"}}>Cadastrar</Button>
                    </Form>
                </div> */}

                    <div className="containern">
                        <Form>
                            <Form.Group controlId="formRanking">
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do Aluno"></Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId="formRanking">
                            <Form.Control type="text" value={data} onChange={event => setData(event.target.value)} placeholder="Data de entrega"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" value={nota} onChange={event => setNota(event.target.value)} placeholder="Nota no Aluno"></Form.Control>
                        </Form.Group> */}
                            <Button type="text">Buscar</Button>





                        </Form>
                    </div>

                    <div className="col">
                        <Table striped bordered variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>André</td>
                                    <td>11/02/2020</td>
                                    <td>100.00</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Alice</td>
                                    <td>16/04/2020</td>
                                    <td>95.0</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Pedro</td>
                                    <td>19/08/2020</td>
                                    <td>75.00</td>

                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Pedro</td>
                                    <td>09/10/2020</td>
                                    <td>70.0</td>

                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Pedro</td>
                                    <td>14/09/2020</td>
                                    <td>65.00</td>

                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Pedro</td>
                                    <td>28/06/2020</td>
                                    <td>98.00</td>

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

export default Ranking;