import React, { useEffect, useState } from 'react';

import {Form, Button, Card, Container, Accordion, Row, Col, Jumbotron, Carousel } from 'react-bootstrap';

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

import logo from '../../assets/img/logo_2.png'
import img1 from '../../assets/img/1.svg'
import img2 from '../../assets/img/2.svg'
import img3 from '../../assets/img/3.svg'
import img4 from '../../assets/img/4.svg'
import img5 from '../../assets/img/5.svg'

import './style.css'

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
        listarPosts();
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

    const listarPosts = () => {
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
            alert('Post salvo com sucesso!');

            listarPosts();
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

            listarPosts();
        })
    }

    const listarHTMLPosts = () => {
        try{
        let number = 0;
        posts.map((item, index) => {
            let number = number + 1;
            if (number === 0){
                return(
                    <h6>Aparentemente não há nenhum post... Tente novamente mais tarde.</h6>
                );
            }
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
        }catch(err){
            return(
                <h6>Aparentemente não há nenhum post... Tente novamente mais tarde.</h6>
            );
        }
    }

    const renderHome = () => {
        const token = localStorage.getItem('token-edux');

        let tokenProfessor = 'Professor';
        let tokenAluno = 'Aluno';

            // jwt_decode(token).role
        if(tokenProfessor  === 'Professora'){
            return (
                <div>
                    <div className="cards">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img3} style={{padding : '1em'}} />
                            <Card.Body>
                                <Card.Title>Alunos</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/gerenciarAluno">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img3} style={{padding : '1em'}} />
                            <Card.Body>
                                <Card.Title>Turmas</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/turmas">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img4} style={{padding : '1em'}}/>
                            <Card.Body>
                                <Card.Title>Gerenciar Objetivos</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/adm/crudobjetivos">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            );
        }else {
            return (
                <div>
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
                                
                                { listarHTMLPosts() }
                            
                            </Row>

                            <h6>Aparentemente não há nenhum post... Tente novamente mais tarde.</h6>

                        
                    </Jumbotron>

                    <div className="cards">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img3} style={{padding : '1em'}} />
                            <Card.Body>
                                <Card.Title>Alunos</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/gerenciarAluno">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img3} style={{padding : '1em'}} />
                            <Card.Body>
                                <Card.Title>Turmas</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/turmas">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img4} style={{padding : '1em'}}/>
                            <Card.Body>
                                <Card.Title>Objetivos</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/adm/crudobjetivos">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            )
        }
    }

    return(

        <div>
            <Menu />
                <Container>

                    <Carousel style={{marginTop : '2em', backgroundColor: '#F1FFFA' }}>
                        <Carousel.Item style={{alignItems: 'center'}}>
                            <img src={img1} alt='Logo EduX' style={{ width : '300px', margin: '2em'}} />

                            <Carousel.Caption className="caption">
                            <h3>Projeto EduX</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={img2} alt='Logo EduX' style={{ width : '309px', margin: '2em'}} />

                            <Carousel.Caption className="caption">
                            <h3>Acompanhe suas notas</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={img3} alt='Logo EduX' style={{ width : '402px', margin: '2em 2em'}} />

                            <Carousel.Caption className="caption">
                            <h3>Ranking</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    { renderHome() }
                
                </Container>
            <Rodape />
        </div>

    );
}

export default Home;