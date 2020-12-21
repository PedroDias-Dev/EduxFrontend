import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import {Form, Button, Card, Container, Table, Jumbotron } from 'react-bootstrap';

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

import like from '../../assets/img/like.svg'

// import './style.css'

const Dicas = () => {

    // let url = 'http://localhost:55718/api/Dica';
    let url = 'http://localhost:5000/api/Dica';
    // let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/dicas'

    const [idDica, setIdDica] = useState(0);
    const [texto, setTexto] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [curtidas, setCurtidas] = useState('');
    const [curtidass, setCurtidass] = useState('');
    const [idUsuario, setIdUsuario] = useState(0);

    const [dicas, setDicas] = useState([]);

    //CONQUISTAS
    const [postagensTotais, setPostagensTotais] = useState('');
    const [curtidasTotais, setCurtidasTotais] = useState('');

    //TOKEN JWT
    const tokenDecode = () => {
        const token = localStorage.getItem('token-edux')

        const IdUsuario = jwt_decode(token).id;

        setIdUsuario(IdUsuario);

        jwt_decode(token).role = 'Professor';
        // console.log(jwt_decode(token))
    }
    

    useEffect(() => {
        listar();
        tokenDecode();
    }, [])

    const listar = () => {
        fetch(url, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {

            limparCampos();

            setDicas((dados.data));
            console.log(dados)
            
        })
        .catch(err => console.log(err))
    }

    


    const postarCurtida = (event, id) => {
        event.preventDefault();
        
        let dica = id;

        const curtida = {
            idDica: dica
        }

        fetch('http://localhost:5000/api/Curtida', {
            method : 'POST',
            body : JSON.stringify(curtida),
            headers : {
                'content-type' : 'application/json'
                // 'authorization' : 'Bearer' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {

            let conquistas = {
                idUsuario: idUsuario,
                postagensTotais: postagensTotais,
                curtidasTotais: Number(curtidasTotais) + 1
            }

            fetch(`http://localhost:55718/api/Usuario/${idUsuario}`, {
                method : 'PATCH',
                body : JSON.stringify(conquistas),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(dados => {
                console.log(dados)
                setCurtidasTotais(dados.curtidasTotais)
            });

            listar();
            alert('Sua dica foi cadastrada e estará visível para o professor!')
        })
        .catch(err => console.error(err))
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
                            Visualize as Dicas dos professores aqui!
                        </p>
                    </Jumbotron>
                   
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Texto</th>
                                <th>Likes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dicas.map((item, index) => {
                                    const verificarImagem = () =>{
                                        if (item.urlImagem === "" || item.urlImagem === null || item.urlImagem === undefined){
                                            return(
                                                
                                                <p style={{alignSelf: 'center', marginTop: 5}}>Não há imagem </p>
                                            )
                                        }
                                        else{
                                            return(
                                                <img style={{width : '200px'}} src={item.urlImagem} alt="Imagem da Dica"/>
                                            );
                                        }
                                    };

                                    

                                    return (
                                        <tr key={index}>
                                            <td>
                                                
                                                {verificarImagem()}

                                            </td>
                                            <td>{item.texto}</td>
                                            <td >
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <Button onClick={(e) => postarCurtida(e, item.idDica)}> 
                                                        <img src={like} alt="Like" style={{width : '20px'}} /> 
                                                    </Button>

                                                    <p style={{marginLeft: '10px'}}>{Object.keys(item.curtida).length}</p>
                                                </div>
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