import { React, useState, useEffect } from 'react';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import { Button, Table, Form } from 'react-bootstrap';
import { url } from '../../../utils/constants';
import './index.css'

const Objetivos = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState([]);
    const [data, setData] = useState([]);
    const [objetivo, setObjetivo] = useState('');


    useEffect(() => {
        listar();
    }, [])

    const listar = () => {
        fetch(`${url}/ObjetivoAluno`)
            .then(response => response.json())
            .then(dados => {
                setObjetivo(dados.data);
            })
            .catch(err => console.error(err));
    }
    const cadastrar = (event) => {
        event.preventDefault();

        const evento = {
            nome: nome,
            data: data
        }


        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/objetivos` : `${url}/objetivos/${id}`);

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(evento),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Objetivo salvo');

                listar();
            })
            .catch(err => console.error(err))

        return (
            <div>
                <Menu />
                <div className="row">
                    <div>
                        <h1 style={{ fontSize: "2.3em", marginLeft: "30px" }}>Objetivos</h1>
                    </div>
                    <div className="container">
                        <Form onSubmit={event => cadastrar(event)}>
                            <Form.Group controlId="formObjetivo">
                                <Form.Control type="text" value={objetivo} onChange={event => setObjetivo(event.target.value)} placeholder="Cadastre o objetivo">
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" style={{ marginBottom: "10px" }}>Cadastrar</Button>
                        </Form>
                    </div>
                    <div className="container">
                        <Form>
                            <Form.Group controlId="formObjetivo">
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do Aluno"></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" value={data} onChange={event => setData(event.target.value)} placeholder="Data do objetivo"></Form.Control>
                            </Form.Group>

                            <Button type="text">Filtrar</Button>
                        </Form>
                    </div>
                    <div className="container ">
                        <Table striped bordered variant="dark">
                            <thead>
                                <tr className="topo">
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Meta</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>André</td>
                                    <td>11/02/2020</td>
                                    <td></td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>João</td>
                                    <td>16/04/2020</td>
                                    <td></td>
                                    <td>8.5</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Pedro</td>
                                    <td>19/08/2020</td>
                                    <td></td>
                                    <td>7.5</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Pedro</td>
                                    <td>09/10/2020</td>
                                    <td></td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Pedro</td>
                                    <td>14/09/2020</td>
                                    <td></td>
                                    <td>9</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Pedro</td>
                                    <td>28/06/2020</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Rodape />
            </div>
        )
    }

}

export default Objetivos;