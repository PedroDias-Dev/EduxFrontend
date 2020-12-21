import { React, useState, useEffect } from 'react';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import { Button, Table, Form } from 'react-bootstrap';
import './index.css'

const CrudObjetivos = () => {
    const [id, setId] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [objetivos, setObjetivos] = useState([]);

    let url = 'https://192.168.1.3:5000/api/Objetivos';
    useEffect(() => {
        listarCategorias();
        listar();
    }, [])

    const listarCategorias = () => {
        fetch('https://192.168.1.3:5000/api/categorias')
            .then(response => response.json())
            .then(dados => {
                limparCampos();
                setCategorias(dados.data);
            })

            .catch(err => console.error(err));
    }

    const listar = () => {
        fetch('https://192.168.1.3:5000/api/Objetivos')
            .then(response => response.json())
            .then(dados => {
                limparCampos();
                setObjetivos(dados.data);
            })

            .catch(err => console.error(err));
    }

    const cadastrar = (event) => {
        event.preventDefault();

        const obj = {
            descricao: descricao,
            idCategoria: idCategoria
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/` : `${url}/${id}`);

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(obj),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Objetivo cadastrado');

                listar();
                console.log(obj);
            })
            .catch(err => console.error(err))
    }


    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`, {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dado => {
                setId(dado.id);
                setDescricao(dado.descricao);
            })
    }


    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Objetivo removido');

                listar();
            })
    }

    const limparCampos = () => {
        setId(0);
        setDescricao('');
    }


    return (
        <div>
            <Menu />
            <div className="row">

                <div className="container">
                    <h1 style={{ fontSize: "2.3em" }}>Objetivos</h1>
                    <Form inline onSubmit={event => cadastrar(event)} style={{ marginBottom: "10px" }}>

                        <Form.Group controlId="formObjetivo">
                            <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Descrição do objetivo" />
                        </Form.Group>

                        <select style={{ marginLeft: '5px' }} className="form-control" value={idCategoria} onChange={event => setIdCategoria(event.target.value)} id="Categoria">
                            <option value={0}>Selecione a Categoria </option>
                            {
                                categorias.map((item, index) => {
                                    return (
                                        <option key={index} value={item.idCategoria}>{item.tipo}</option>
                                    )
                                })
                            }
                        </select>
                        <Button type="text" style={{ marginLeft: "10px" }}> Cadastrar </Button>
                    </Form>
                </div>



                <div className="container ">
                    <Table striped bordered variant="dark">
                        <thead>
                            <tr className="topo">
                                <th>Descrição</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                objetivos.map((item, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{item.descricao}</td>
                                            <td>{item.categorias}</td>
                                            <td>
                                                <Button variant="warning" value={item.idObjetivo} onClick={event => editar(event)} >Editar</Button>
                                                <Button variant="danger" value={item.idObjetivo} onClick={event => remover(event)} style={{ marginLeft: '35px' }}>Remover</Button>
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