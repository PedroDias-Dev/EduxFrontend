import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';
import {  Table } from 'react-bootstrap';
import { url } from '../../utils/constants';
// import './index.css'

const Ranking = () => {


    const [nome, setNome] = useState([]);
     

    useEffect(() => {
        listar();
    }, [])

    const listar = () => {
        fetch(`${url}/ranking`)
            .then(response => response.json())
            .then(dados => {
                setNome(dados.data);
            })
            .catch(err => console.error(err));
    }


    return (

        <div>
            <Menu />


            <div className="container" >
                <div className="row">

                    <div>
                        <h1 style={{ fontSize: "2.3em", marginLeft: "20px" }}>Ranking Geral</h1>
                    </div>

                    <div className="containern">
            <Table striped bordered variant="dark">
            <thead>
                <tr>

                    <th>#</th>
                    <th>Nome</th>
                    <th>Nota</th>
                    <th>Turma</th>
                </tr>
            </thead>
            <tbody>
                {
                    nome.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.nota}</td>
                                <td>{item.turma}</td>
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
       </div>


    )
}

export default Ranking;