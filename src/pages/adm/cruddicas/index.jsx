import React, { useEffect, useState } from 'react';

import {Form, Button, Card, Container, Table, Jumbotron } from 'react-bootstrap';

import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';

import './style.css'

const Dicas = () => {

    let url = 'http://localhost:55718/api/Dica/';

    const [idDica, setIdDica] = useState(0);
    const [texto, setTexto] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [ dicas, setDicas] = useState([]);

    useEffect(() => {
        listar();
    }, [])

    const listar = () => {
        fetch(url, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            console.log(dados)

            limparCampos();

            setDicas((dados));
        })
        .catch(err => console.log(err))
      }


    const salvar = (event) => {
        event.preventDefault();

        const dica = {
            texto : texto,
            urlImagem : urlImagem
        }

        let method = (idDica === 0 ? 'POST' : 'PUT');
        let urlRequest = (idDica === 0 ? `${url}` :  `${url}/${idDica}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(dica),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Dica salva com sucesso!');

            listar();
        })
        .catch(err => console.error(err))
    }

    const uploadFile = (event) => {
        event.preventDefault();

        let formdata = new FormData();

        formdata.append('arquivo', event.target.files[0]);

        fetch(url ,{
            method : 'POST',
            body : formdata
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url);
        })
        .catch(err => console.log(err))

    }

    const editar = (event) => {
        event.preventDefault();

        console.log(event.target)

        fetch(`${url}${event.target.value}`, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setIdDica(dado.data.idDica);
            setTexto(dado.data.texto);
            setUrlImagem(dado.data.urlImagem);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        console.log(event.target)

        fetch(url + event.target,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria removida');

            listar();
        })
    }

    const limparCampos = () => {
        setIdDica(0);
        setTexto('');
        setUrlImagem('');
    }

    return(
        <div>
            <Menu />
            
            <Container>
                    <Jumbotron style={{marginTop : '2em'}}> 
                        <h1 style={{color: 'black'}}>Dicas</h1>
                        <p>
                            Gerencie e crie novas dicas para seus alunos!
                        </p>
                    </Jumbotron>
                    <Card>
                        <Card.Body>
                        <Form onSubmit={ event => salvar(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Texto</Form.Label>
                                <Form.Control type="text" value={texto} onChange={event => setTexto(event.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formNome">
                                <Form.File id="fileCategoria" label="Imagem da Dica" onChange={event => uploadFile(event)} />
                                { urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                            </Form.Group>
                            <Button type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Texto</th>
                                {/* <th>Id</th> */}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dicas.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img src={item.urlImagem} style={{ width : '120px'}}/></td>
                                            <td>{item.texto}</td>
                                            <td>
                                                <button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</button>
                                                <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>

            <Rodape />
        </div>
    )
}

export default Dicas;