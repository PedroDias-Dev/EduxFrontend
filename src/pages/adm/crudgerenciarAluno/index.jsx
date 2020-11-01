import React, {useEffect, useState} from "react";
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import { Form, Button, Table} from "react-bootstrap";
import {url} from "../../../utils/constants";

const CrudGerenciar  = () => {
    const [id, setId] = useState(0); 
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");


    useEffect(() => {
        listar();
    }, []); 

    const listar = (event) => {
        fetch(`${url}/gerenciarAluno`)
            .then(response => response.json())
            .then(dados => {
                setNome(dados.data);
            })
            .catch(err => alert(err + ". Ligue para o nosso SAQ!"));
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(url + "/genrenciarAluno/" + event.target.value)
        .then(response => response.json())
        .then(dados => {
            setId(dados.data.id);
            setNome(dados.data.nome);
            setData(dados.data.data);
          
        })
        .catch(err => alert(err + ". Ligue para o nosso SAQ!"));
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + "/gerenciarAluno/" + event.target.value, { 
            method: "DELETE",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token-edux")
            }
        })
        .then(response => response.json())
        .then(response => {
            alert("Aluno deletado com sucesso.");
            listar(); 
        })
        .catch(err => alert(err + ". Ligue para o nosso SAQ!"));
    }

    const limparCampos = () => {
        setId(0);
        setNome("");
        setData("");
    }


    const cadastrar = (event) => {
        event.preventDefault();

        let geren = {
            nome: nome,
            data: data
        }

        let metodo = (id === 0 ? "POST" : "PUT");
        let urlPostOuPut = (id === 0 ? `${url}/gerenciarAluno` : `${url}/gerenciarAluno/${id}`);
    
        fetch(urlPostOuPut, {
            method: metodo,
            body: JSON.stringify(geren),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token-nyous") 
            } 
        })
        .then(response => response.json())
        .then(response => {
            if(metodo==="POST")
                alert("Aluno cadastrado com sucesso.");
            else 
                alert("Aluno editado com sucesso.");
            listar();
        })
        .catch(err => alert(err + ". Ligue para o nosso SAQ!"));
    }

    return (

        <div>
            <Menu />

            <div className="container" >
                <div className="row">

                    <div>
                        <h1 style={{ fontSize: "2.3em", marginLeft: "20px" }}>Gerenciar Alunos</h1>
                    </div>

                    <div className="containern">
                        <Form onSubmit={event => cadastrar(event)}>
                            <Form.Group controlId="formGerenciar">
                            <Form.Label style={{ color: "lavender", paddingTop:"15px" }}>Cadastre o aluno</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Cadastre o aluno">
                                </Form.Control>
                                <Form.Label for="diaa" style={{ color: "lavender", paddingTop:"15px" }}>Informe a data de nascimento do Aluno</Form.Label>
                                <div style={{ marginBottom: "10px" }}>
                                 <input type="date" id="diaa" name="diaa" ></input>
                                 </div>
                            </Form.Group>
                            
                            <Button type="submit" style={{ marginBottom: "10px" }}>Cadastrar</Button>
                        
                        </Form>
                    </div>

                    <div className="container">
                       <Form >
                       <Form.Label style={{ color: "lavender", paddingTop:"15px" }}>Busque o aluno</Form.Label>
                         <Form inline> 
                            <Form.Group controlId="formGerenciar">
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do Aluno"></Form.Control>
                                <Button variant="outline-success" style={{ color: "lavender", marginLeft: "10px", }}>Search</Button>
                            </Form.Group>   
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


export default CrudGerenciar;
