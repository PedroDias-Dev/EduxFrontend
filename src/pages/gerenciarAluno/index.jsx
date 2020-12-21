import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Form, Button, Table, FormControl, Toast } from 'react-bootstrap';
// import { url } from '../../utils/constants';
import './index.css'

const GerenciarAluno = () => {

    const [alunos, setAlunos] = useState([
        {
            nome: "André",
            dataNascimento: ""
        },
        {
            nome: "Alice",
            dataNascimento: ""
        },
    ])

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

    const CorpoTabela = ({nome}) => {
        alunos.map((aluno, index) => {
            if(nome!=""&&aluno.nome===nome) {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.dataNascimento}</td>
                    </tr>
                )
            }
            else if(nome==="") {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.dataNascimento}</td>
                    </tr>
                )
            }
            return("")
        })

    // const cadastrar = (event) => {
    //     event.prevent.default();
    // }

    return (
        <div className= "tudo">
            <Menu />
            <div className="container" >
                <div className="row">
                    <div>
                        <h1 style={{ fontSize: "2.3em", marginLeft: "20px" }}>Gerenciar Alunos</h1>
                    </div>
                </div>
                <div className="containerb">
                    <Form.Label style={{ color: "lavender", paddingTop:"15px" }}></Form.Label>
                    <Form.Group controlId="formGerenciar">
                        <Form.Control input id="filtro" type="text" placeholder="Filtrar" value={nome} onChange={event => setNome(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Table striped bordered variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Data de nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CorpoTabela nome={nome}/>
                        </tbody>
                    </Table>
                    <Rodape />
                </div>
            </div>
        </div>
    );
};

export default GerenciarAluno