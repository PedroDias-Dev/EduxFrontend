import React, { useEffect, useState } from "react";
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import { Form, Container, Button, Table, Card, Jumbotron } from "react-bootstrap";
import { url } from "../../../utils/constants";

const Gerenciar = () => {
    // let url = 'http://localhost:55718/api/AlunoTurma';
    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/alunos'

    const [idAlunoTurma, setIdAlunoTurma] = useState(0);

    const [idUsuario, setIdUsuario] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");

    const [idTurma, SetIdTurma] = useState("");
    const [matricula, SetMatricula] = useState("");

    const [alunos, SetAlunos] = useState([]);

    const [alunosPorId, SetAlunosPorId] = useState([]);

    useEffect(() => {
        listar();
    }, [])

    const listar = () => {
        fetch(`${url}`)
            .then(response => response.json())
            .then(dados => {
                SetAlunos(dados);
                // setIdAluno(dados.idAluno);
                console.log(dados)

                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const listarPorId = (event) => {
        event.preventDefault();

        fetch(`${url}/${idAlunoTurma}`, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                SetAlunosPorId(dados);

                console.log(dados);

                limparCampos();
            })
            .catch(err => console.error(err));

    }


    const salvar = (event) => {
        event.preventDefault();

        const aluno = {
            idUsuario: idUsuario,
            idTurma: idTurma,
            matricula: matricula
        }


        let method = (idAlunoTurma === 0 ? 'POST' : 'PUT');
        let urlRequest = (idAlunoTurma === 0 ? `${url}/` : `${url}/${idAlunoTurma}`);

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(aluno),
            headers: {
                'content-type': 'application/json'
                // 'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Aluno cadastrado!');

                listar();
            })
            .catch(err => console.error(err))
    }    

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setIdAlunoTurma(dado.idAlunoTurma);
            setIdUsuario(dado.idUsuario);
            SetIdTurma(dado.idTurma);
            SetMatricula(dado.matricula);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        // console.log(event.target)

        fetch(`${url}/${event.target.value}`,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Aluno removido');

            listar();
        })
    }

    const limparCampos = () => {
        setIdAlunoTurma(0);
        setIdUsuario('');
        SetIdTurma('');
        SetMatricula('');
    }


    return (
        <div>

            <Menu />
            <Container>

            <Jumbotron style={{marginTop : '2em'}}> 
                        <h1 style={{color: 'black'}}>Alunos</h1>
                        <p>
                            Gerencie os seus alunos!
                        </p>
                    </Jumbotron>
             <Card>

                <Card.Body>
                     
                <Form onSubmit = {event => salvar(event)}>
                    <Form.Group controlId="forNome">
                     <Form.Label>Id de Usuario</Form.Label>
                     <Form.Control type="text" value={idUsuario} onChange={event => setIdUsuario(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="forNome">
                     <Form.Label>Id de Turma</Form.Label>
                     <Form.Control type="text" value={idTurma} onChange={event => SetIdTurma(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="forNome">
                     <Form.Label>Matrícula</Form.Label>
                     <Form.Control type="text" value={matricula} onChange={event => SetMatricula(event.target.value)} />
                    </Form.Group>
                    

                    <Button type="text"> Cadastrar </Button> 
                </Form>

                </Card.Body>

             </Card>

             {/* <Card>
                 <Card.Body>

                    {/* <Form onSubmit = {event => dadosUsuario(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Control type="text" value={idAlunoTurma} onChange={event => setIdAlunoTurma(event.target.value)} placeholder="Id de Aluno"></Form.Control>
                            </Form.Group>

                            <Button type="text">Filtrar</Button>
                    </Form> */}
{/* 
                 </Card.Body>
             </Card> */} 

             <Table bordered>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Id Usuario</th>
                                <th>Id Turma</th>
                                <th>Matricula</th>
                                {/* <th>Data</th> */}
                                {/* <th>Id</th> */}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alunos.map((item, index) => {
                                    // dadosUsuario(item.idUsuario);

                                    return (
                                        <tr key={index}>
                                            <td>{item.idUsuario}</td>
                                            <td>{item.idTurma}</td>
                                            <td>{item.matricula}</td>
                                            {/* <td>{item.data}</td> */}
                                            <td>
                                                <Button variant="warning" value={item.idAlunoTurma} onClick={event => editar(event)} >Editar</Button>
                                                <Button variant="danger" value={item.idAlunoTurma} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
            

            </Container>
            <Rodape/>
        </div>

    )


}


export default Gerenciar;
