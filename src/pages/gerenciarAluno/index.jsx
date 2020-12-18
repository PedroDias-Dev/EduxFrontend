import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Form, Button, Table, FormControl } from 'react-bootstrap';
import { url } from '../../utils/constants';
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
    }

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
    )
}

export default GerenciarAluno;