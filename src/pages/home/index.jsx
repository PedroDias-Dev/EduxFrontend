import React, { useEffect, useState } from 'react';

<<<<<<< HEAD
import {Form, Button, Table, Card, Container, Accordion, Row, Col, Jumbotron } from 'react-bootstrap';
=======
import {Form, Button, Card, Container, Accordion, Row, Col, Jumbotron } from 'react-bootstrap';
>>>>>>> 4daa72cced1df5ec097e477c96f59b1c2c9c4f12

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

// import logo from '../../assets/img/logo_2.png'

const Home = () => {

    let url = 'http://localhost:57332'

    const [ id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [link, setLink] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [posts, setPost] = useState([]);
    const [cursoId, setCursoId] = useState('');
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        listarEventos();
    }, []);

    const listarCursos = () => {
        fetch('http://localhost:62602/api/Cursos')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const listarEventos = () => {
        fetch('http://localhost:62602/api/')
            .then(response => response.json())
            .then(data => {
                setPost(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setId(0);
        setNome('');
        setLink('');
        setUrlImagem('');
        setDescricao('');
        setCursoId(0);
    }

    const uploadFile = (event) => {
        event.preventDefault();

        let formdata = new FormData();

        formdata.append('arquivo', event.target.files[0]);

        fetch(`${url}/upload`,{
            method : 'POST',
            body : formdata
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url);
        })
        .catch(err => console.log(err))

    }

    const salvar = (event) => {
        event.preventDefault();

        const post = {
            nome : nome,
            urlImagem :urlImagem,
            link : link,
            descricao : descricao
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Eventos` : `${url}/Eventos/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(post),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Evento salva');

            listarEventos();
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/Eventos/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            setId(dado.data.id);
            setNome(dado.data.nome);
            setLink(dado.data.link);
            setUrlImagem(dado.data.urlImagem);
            setDescricao(dado.data.descricao);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/Eventos/${event.target.value}`,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Post Apagado com sucesso!');

            listarEventos();
        })
    }

    return(

        <div>
            <Menu />
            <Container>

            <Jumbotron>
                <div style={{ display : 'flex', alignItems: 'center' }}>

                    <h1 style={{color : "black"}}>Projeto EduX</h1>
                    {/* <img src={logo} alt='Logo EduX' style={{ width : '200px', marginLeft : '2em'}} /> */}
                    
                </div>
            <p>
                
            </p>
            <p>
                <a href="#"><Button variant="primary">Saiba mais!</Button></a>
            </p>
            </Jumbotron>

            {/* <Jumbotron> */}

                <Accordion defaultActiveKey="1" style={{ marginTop : '2em'}}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Crie um post aqui!
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={event => salvar(event)}>
                                    <Form.Group controlId="formBasicNome">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Titulo do post"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicLink">
                                        <Form.Label>Link (Opcional) </Form.Label>
                                        <Form.Control type="text" value={link} onChange={event => setLink(event.target.value)} placeholder="http://"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCurso">
                                        <Form.Label>Curso</Form.Label>
                                        <Form.Control as="select" size="lg" custom defaultValue={cursoId} onChange={event => setCursoId(event.target.value)} >
                                            <option value={0}>Selecione</option>
                                            {
                                                cursos.map((item, index) => {
                                                    return(
                                                        <option value={item.id}>{item.nome}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formBasicUrl">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.File id="fileCategoria" label="Imagem do post" onChange={event => { uploadFile(event)}} />
                                        {urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                                    </Form.Group>
                                    <Button type="submit">Salvar</Button>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <Jumbotron style={{ marginTop : '1em'}}>
                    <h3 style={{color : 'black'}}>Timeline:</h3>
                        <Row>
                            {
                                posts.map((item, index) => {
                                    return (
                                        <Col xs='4'>
                                            <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.urlImagem} />
                                            <Card.Body>
                                                <Card.Title>{item.nome}</Card.Title>
                                                <Card.Text>{item.descricao}</Card.Text>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                        <h6>Aparentemente não há nenhum post... Tente novamente mais tarde.</h6>
                </Jumbotron>
            {/* </Jumbotron> */}

            </Container>
            <Rodape />
        </div>

    );
}

export default Home;