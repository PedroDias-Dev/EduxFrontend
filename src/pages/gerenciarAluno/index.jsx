import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Form, Button, Table, FormControl, Toast } from 'react-bootstrap';
// import { url } from '../../utils/constants';
import './index.css'

const GerenciarAluno = () => {
    // let url = 'http://localhost:55718/api/AlunoTurma'
    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/alunos'

    const [nome, setNome] = useState("");
    const [alunos, setAlunos] = useState([]);

    const [id, setId] = useState(0);
    const [idAluno, setIdAluno] = useState('');
    const [matricula, setMatricula] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [idTurma, setIdTurma] = useState('');

    const [alunosBusca, setAlunosBusca] = useState([]);

    useEffect(() => {
        listar();
    }, [])

    const listar = (event) => {
        fetch(`${url}`)
            .then(response => response.json())
            .then(dados => {
                setAlunos(dados);
            })
            .catch(err => console.error(err));
    }

    const buscar = (event) => {
        event.preventDefault();

        fetch(`${url}/${idAluno}`)
            .then(response => response.json())
            .then(dados => {
                console.log(dados)  
                
                setAlunosBusca(dados);
                return (
                    <tr >
                        <td>{dados.id}</td>
                        <td>{dados.idUsuario}</td>
                        <td>{dados.matricula}</td>
                        <td>{dados.idTurma}</td>
                    </tr>
                )

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
                        <h1 style={{ fontSize: "2.3em", marginLeft: "20px" }}>Alunos</h1>
                    </div>

                    <div className="container">
                       <Form >
                            <Form.Label style={{ color: "lavender", paddingTop:"15px" }}>Busque o aluno</Form.Label>
                                <Form inline> 
                                    <Form.Group controlId="formGerenciar">
                                        <Form.Control type="text" value={idAluno} onChange={event => setIdAluno(event.target.value)} placeholder="Id de Aluno"></Form.Control>
                                    </Form.Group>   
                            <Button onClick={event => buscar(event)} variant="outline-success" type='submit' style={{ color: "lavender", marginLeft: "10px", }}>Search</Button>
                            <div className="col">
                                <Table striped bordered variant="dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Id de Usuario</th>
                                            <th>Matricula</th>
                                            <th>Id de Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </Table>
                            </div>
                        </Form>
                        
                            <Form.Group>

                                <Form.Label style={{ color: "lavender", paddingTop:"15px" }}>Preference</Form.Label>

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
                                        style={{ color: "lavender", marginLeft: "10px", }}
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
                                    <th>Id de Usuario</th>
                                    <th>Matricula</th>
                                    <th>Id de Turma</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                alunos.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.idUsuario}</td>
                                            <td>{item.matricula}</td>
                                            <td>{item.idTurma}</td>
                                        </tr>
                                    )
                                })
                            }
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