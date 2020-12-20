// import React, { useEffect, useState } from "react";
// import Menu from '../../../components/menu/index';
// import Rodape from '../../../components/rodape/index';
// import { Form, Container, Button, Table, Card } from "react-bootstrap";
// import { url } from "../../../utils/constants";

// const Gerenciar = () => {
//     const [idGeren, setIdGeren] = useState(0);
//     const [nome, setNome] = useState("");
//     const [data, setData] = useState("");

//     useEffect(() => {
//         listar();
//     }, [])

//     const listar = () => {
//         fetch(`${url}/GerenciarAluno`)
//             .then(response => response.json())
//             .then(dados => {
//                 setNome(dados.data);
//             })
//             .catch(err => console.error(err));
//     }

//     const salvar = (event) => {
//         event.preventDefault();

//         const geren = {
//             nome: nome,
//             data: data
//         }


//         let method = (id === 0 ? 'POST' : 'PUT');
//         let urlRequest = (id === 0 ? `${url}/gerenciar` : `${url}/gerenciar/${id}`);

//         fetch(urlRequest, {
//             method: method,
//             body: JSON.stringify(geren),
//             headers: {
//                 'content-type': 'application/json',
//                 'authorization': 'Bearer ' + localStorage.getItem('token-edux')
//             }
//         })
//             .then(response => response.json())
//             .then(dados => {
//                 alert('Aluno cadastrado');

//                 listar();
//             })
//             .catch(err => console.error(err))
//     }    

//     const editar = (event) => {
//         event.preventDefault();

//         fetch(`${url}/${event.target.value}`, {
//             method : 'GET',
//             // headers : {
//             //     'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
//             // }
//         })
//         .then(response => response.json())
//         .then(dado => {
//             setIdGeren(dado.idGeren);
//             setNome(dado.nome);
//             setData(dado.data);
//         })
//     }

//     const remover = (event) => {
//         event.preventDefault();

//         console.log(event.target)

//         fetch(`${url}/${event.target.value}`,{
//             method : 'DELETE',
//             // headers : {
//             //     'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
//             // }
//         })
//         .then(response => response.json())
//         .then(dados => {
//             alert('Aluno removido');

//             listar();
//         })
//     }

//     const limparCampos = () => {
//         setIdGeren(0);
//         setNome('');
//         setData('');
//     }


//     return (
//         <div>

//             <Menu />
//             <Container>

//             <Jumbotron style={{marginTop : '2em'}}> 
//                         <h1 style={{color: 'black'}}>Dicas</h1>
//                         <p>
//                             Gerencie os seus alunos!
//                         </p>
//                     </Jumbotron>
//              <Card>

//                 <Card.Body>
                     
//                 <Form onSubmit = {event => salvar(event)}>
//                     <Form.Group controlId="forNome">
//                      <Form.Label>Nome</Form.Label>
//                      <Form.Control type="text" value= {nome} onChange={event => setNome(event.target.value)} />
//                     </Form.Group>
                    
//                     <Form.Group controlId="forNome">
//                      <Form.Label>Data</Form.Label>
//                      <Form.Control type="text" value= {data} onChange={event => setData(event.target.value)}> </Form.Control>
//                     </Form.Group>

//                     <Button type="text"> Cadastrar </Button> 
//                 </Form>

//                 </Card.Body>

//              </Card>

//              <Card>
//                  <Card.Body>

//                  <Form>
//                             <Form.Group controlId="formNome">
//                                 <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do Aluno"></Form.Control>
//                             </Form.Group>

//                             <Form.Group>
//                                 <Form.Control type="text" value={data} onChange={event => setData(event.target.value)} placeholder="Data de nascimento do Aluno"></Form.Control>
//                             </Form.Group>

//                             <Button type="text">Filtrar</Button>
//                         </Form>

//                  </Card.Body>
//              </Card>

//              <Table bordered>
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Nome</th>
//                                 <th>Data</th>
//                                 {/* <th>Id</th> */}
//                                 <th>Ações</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 gerenciar.map((item, index) => {
//                                     return (
//                                         <tr key={index}>
//                                             <td>{item.nome}</td>
//                                             <td>{item.data}</td>
//                                             <td>
//                                                 <Button variant="warning" value={item.idGeren} onClick={event => editar(event)} >Editar</Button>
//                                                 <Button variant="danger" value={item.idGeren} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
//                                             </td>
//                                         </tr>
//                                     )
//                                 })
//                             }
//                         </tbody>
//                     </Table>
            

//             </Container>
//             <Rodape/>
//         </div>

//     )


// }


// export default Gerenciar;
