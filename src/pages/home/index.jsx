import React, { useEffect, useState, useRef } from 'react';

import {Form, Button, Card, Container, Accordion, Row, Jumbotron, Carousel, Overlay, Tooltip } from 'react-bootstrap';

import  jwt_decode  from 'jwt-decode';

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

import logo from '../../assets/img/logo_2.png'
import img1 from '../../assets/img/1.svg'
import img2 from '../../assets/img/2.svg'
import img3 from '../../assets/img/3.svg'
import img4 from '../../assets/img/4.svg'
import img5 from '../../assets/img/5.svg'

import './style.css'

//HOTFIX TEST



const Home = () => {

    //let url = 'http://localhost:57332'
    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/edux'

    const [ id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [link, setLink] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [curtidas, setCurtidas] = useState(0);

    const [idUsuario, setIdUsuario] = useState(0);

    const [nomeUser, setNomeUser] = useState('');
    const [posts, setPost] = useState([]);
    const [cursoId, setCursoId] = useState('');
    const [cursos, setCursos] = useState([]);

    // NAME POLICIES
    const [show, setShow] = useState(false);
    const target = useRef(null);

    //CONQUISTAS
    const [postagensTotais, setPostagensTotais] = useState('');
    const [curtidasTotais, setCurtidasTotais] = useState('');

    //TOKEN JWT
    const tokenDecode = () => {
        const token = localStorage.getItem('token-edux')

        const IdUsuario = jwt_decode(token).id;

        // const PostagensTotais = jwt_decode(token).postagensTotais;
        // console.log(PostagensTotais)
        // const CurtidasTotais = jwt_decode(token).curtidasTotais;

        setIdUsuario(IdUsuario);

        // setPostagensTotais(PostagensTotais);
        // setCurtidasTotais(CurtidasTotais);

        // const token = localStorage.getItem('token-edux');
        jwt_decode(token).role = 'Professor';
        // console.log(jwt_decode(token))
    }

    //AUTOMATIC SCROLL
    const myRef = useRef(null)
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
    const executeScroll = () => scrollToRef(myRef)

    //NOME DE USUARIO
    const token = localStorage.getItem('token-edux');

    const SetNomeUser = () =>{
        setNomeUser((jwt_decode(token).nameid));

        console.log(nomeUser);
    }


    useEffect(() => {
        listarPosts();
        tokenDecode();
        SetNomeUser();
    }, []);

    const listarPosts = () => {
        fetch(url, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
          setPost(dados);

        //   console.log(dados);
        })
        .catch(err => console.log(err))
      }

    const limparCampos = () => {
        setId(0);
        setNome('');
        setLink('');
        setUrlImagem('');
        setDescricao('');
        setNomeUser('');
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

        SetNomeUser();
        

        const post = {
            nome : nome,
            urlImagem :urlImagem,
            link : link,
            descricao : descricao,
            nomeUser: nomeUser,
            curtidas: curtidas
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}` : `${url}/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(post),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(dados => {

            fetch(`http://localhost:5000/api/Usuario/${idUsuario}`, {
                method : 'GET'
            })
            .then(response => response.json())
            .then(dados => {
                console.log(dados);
                setPostagensTotais(dados.postagensTotais + 1);
                setCurtidasTotais(dados.curtidasTotais);

                let conquistas = {
                    idUsuario: idUsuario,
                    postagensTotais: postagensTotais,
                    curtidasTotais: curtidasTotais
                }
    
                fetch(`http://localhost:5000/api/Usuario/${idUsuario}`, {
                    method : 'PATCH',
                    body : JSON.stringify(conquistas),
                    headers : {
                        'content-type' : 'application/json'
                    }
                })
                .then(response => response.json())
                .then(dadoss => {
                    console.log(dadoss)
                    setPostagensTotais(dados.postagensTotais);
                    console.log(postagensTotais)
                    console.log('deu tudo certo meu lindo!')
                });
                alert('Post salvo com sucesso!');
    
                listarPosts();
                
            });

            
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();
        executeScroll();

        // console.log('A')

        fetch(`${url}/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);

            setId(dado.id);
            setNome(dado.nome);
            setLink(dado.link);
            setUrlImagem(dado.urlImagem);
            setDescricao(dado.descricao);
            setCurtidas(dado.curtidas);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`,{
            method : 'DELETE',
            // headers : {
            //     'authorization' : 'Bearer' + localStorage.getItem('token-edux')
            // }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Post Apagado com sucesso!');

            listarPosts();
        })
    }

    const likes = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            console.log(dado.curtidas)

            var curtidas = Number(dado.curtidas);


            const post = {
                nome : dado.nome,
                urlImagem : dado.urlImagem,
                link : dado.link,
                descricao : dado.descricao,
                nomeUser: dado.nomeUser,
                curtidas: dado.curtidas + 1
            }     

            fetch(`${url}/${event.target.value}`, {
                method : 'PUT',
                body : JSON.stringify(post),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(dadoS => {
            console.log(dadoS.curtidas)

            listarPosts();
        })
        })

        
    }
    

    function EditarRemover(item){

        if((jwt_decode(token).nameid) === item.nomeUser){
            return(
                <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '0.3em'}}>
                <Button type="button" variant="warning" value={item.id}  onClick={ event => editar(event)}>Editar</Button>
                <Button type="button" variant="danger" value={item.id}  onClick={ event => remover(event)}>Remover</Button>
                </div>
        )
        }
    }
   

    const renderHome = () => {
        const token = localStorage.getItem('token-edux');

        let tokenProfessor = 'Professor';
        let tokenAluno = 'Aluno';

            // jwt_decode(token).role
        if(jwt_decode(token).role  === 'Professorre'){
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
                                <a href="/adm/alunos">
                                <Button variant="primary">Ir</Button>
                                </a>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img3} style={{padding : '1em'}} />
                            <Card.Body>
                                <Card.Title>Gerenciar Dicas</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/adm/dicas">
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
                    <Accordion ref={myRef} defaultActiveKey="1" style={{ marginTop : '2em'}}>
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
                                            <a ref={target} onClick={() => setShow(!show)}>
                                                <Form.Label >Nome de usuario: {jwt_decode(token).nameid}</Form.Label>
                                            </a>
                                            <Overlay target={target.current} show={show} placement="right">
                                                {(props) => (
                                                <Tooltip id="overlay-example" {...props}>
                                                    Conforme os termos e condições, seu nome de usuário aparece para outros usuários
                                                </Tooltip>
                                                )}
                                            </Overlay>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicNome">
                                            <Form.Label>Título</Form.Label>
                                            <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Titulo do post"></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicLink">
                                            <Form.Label>Link (Opcional) </Form.Label>
                                            <Form.Control type="text" value={link} onChange={event => setLink(event.target.value)} placeholder="http://"></Form.Control>
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
                        {/* <div style={{display :'flex', justifyContent: 'space-around', backgroundColor: '#F1FFFA'}}> */}
                            <Row style={{justifyContent: 'space-around', backgroundColor: '#e9ecef'}}>
                                { 
                                    posts.map((item, index) => {
                                        return (
                                            <Card style={{ width: '20em', height : '19em', marginTop: '2em', marginBottom: '2em' }}>
                                            <Card.Body>
                                                
                                                <p><Card.Img style={{ width: '20%'}} variant="top" src={item.urlImagem} /> {item.nomeUser}</p>
                                                <Card.Title>{item.nome}</Card.Title>
                                                <Card.Text>
                                                {item.descricao}
                                                
                                                </Card.Text>
                                                
                                                
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <a href={item.link}><Button variant="primary" style={{width: '100%'}}>Ir</Button></a>
                                                    
                                                    <Button variant="primary" value={item.id} style={{width: '100%', marginLeft: '0,3em'}} onClick={ event => likes(event)} >Likes: {item.curtidas}</Button>
                                                </div>
                                                {
                                                    EditarRemover(item)
                                                }
                                            </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
                        {/* </div> */}
                            </Row>

                        
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
                                <Card.Title>Dicas</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <a href="/dicas">
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