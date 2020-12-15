import { React, useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Button, Table, Form } from 'react-bootstrap';
import { url } from '../../utils/constants';


const Objetivos = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [objetivo, setObjetivo] = useState('');

    useEffect(() => {
        listar();
    }, [])

    const listar = (event) => {
        fetch(`${url}/objetivoAluno`)
        .then(response  => response.json())
        .then(dados => {
            setObjetivo(dados.data);
        })
        .catch(err => console.error(err + " Ocorreu um erro!"));
    }

    return (
        <div>
            <Menu/>

            <div className="container" >
                <div className="row">

                <div>
                    <h1 style={{ fontSize: "2.3em"}}>Objetivos</h1>
                </div>

                <div className="container">
                    <Form inline>
                        <Form.Group controlId="formObjetivo">
                            <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} style={{marginRight : "10px"}} placeholder="Nome da matéria"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" value={data} onChange={event => setData(event.target.value)} style={{marginRight : "10px"}} placeholder="Data do objetivo"></Form.Control>
                        </Form.Group>

                        <Button type="text">Filtrar</Button>
                    </Form>
                </div>

                <div className="container">
                    <Table striped bordered variant="dark">
                        <thead>
                            <tr className="topo">
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
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>João</td>
                                <td>16/04/2020</td>
                                <td>8.5</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Pedro</td>
                                <td>19/08/2020</td>
                                <td>7.5</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Pedro</td>
                                <td>09/10/2020</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Pedro</td>
                                <td>14/09/2020</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Pedro</td>
                                <td>28/06/2020</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <Rodape/>
        </div>
    </div>
    )
}

export default Objetivos;