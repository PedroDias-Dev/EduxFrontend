import { React, useState, useEffect } from 'react';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import { Button, Table, Form } from 'react-bootstrap';
import './index.css'

const CrudObjetivos = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState([]);
    const [data, setData] = useState([]);
    const [objetivo, setObjetivo] = useState([]);
  
    let url = 'http://localhost:44322/api/ObjetivoAluno';
   // let url = 'https://5f89d7f818c33c0016b31397.mockapi.io/api/objetivos';

    useEffect(() => {
        listar();
    }, [])

    const listar = () => {
        fetch(url, 
          
        )
        .then(response => response.json())
        .then(dados => {

            limparCampos(); 
            
            setObjetivo(dados.objetivo);
        }
        )
        .catch(err => console.log(err))
    }

    const cadastrar = (event) => {
        event.preventDefault();

        const objetivo = {
            nome: nome,
            data: data
        }


        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}` :  `${url}/${id}`);

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(objetivo   ),
            //  headers: {
            //    'content-type': 'application/json',
            //    'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            //}
        })
            .then(response => response.json())
            .then(dados => {
                alert('Objetivo salvo');

                console.log();

                listar();

            })
            .catch(err => console.error(err))
    }

        const editar = (event) => {
            event.preventDefault();

            fetch(`${url}${event.target.value}`, {
                method: 'PUT',
               //  headers : {
               //      'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
               // }
            })
                .then(response => response.json())
                .then(dado => {
                    setId(dado.id);
                    setNome(dado.nome);
                    setData(dado.data);
                })
        }


        const remover = (event) => {
            event.preventDefault();

            console.log(event.target)

            fetch(`${url}/${event.target.value}`, {
                method: 'DELETE',
                // headers : {
                //     'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                // }
            })
                .then(response => response.json())
                .then(dados => {
                    alert('Objetivo removido');

                    listar();
                })
        }

        const limparCampos = () => {
            setId(0);
            setNome('');
            setData('');
        }

    
    return (
        <div>
            <Menu />
            <div className="row">

                <div className="container">
                    <h1 style={{ fontSize: "2.3em" }}>Objetivos</h1>
                    <Form onSubmit={event => cadastrar(event)}>
                        <Form.Group controlId="formObjetivo">
                            <Form.Control type="text" value={objetivo} onChange={event => setObjetivo(event.target.value)} placeholder="Cadastre o objetivo" />
                        </Form.Group>
                        <Button type="submit" style={{ marginBottom: "10px" }}>Cadastrar</Button>
                    </Form>
                </div>

                <div className="container">
                    <Form>
                        <Form.Group controlId="formNome">
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
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                objetivo.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nome}</td>
                                            <td>{item.data}</td>
                                            <td>
                                                <Button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</Button>
                                                <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft: '40px' }}>Remover</Button>
                                            </td>
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
    )


}

export default CrudObjetivos;