import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import  jwt_decode  from 'jwt-decode';
import { useHistory} from 'react-router-dom';

const Menu = () => {
    const history = useHistory();

    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem('token-edux');

        history.push('/')
    }

    const renderMenu = () => {
        const token = localStorage.getItem('token-edux');


        if(token === null){
            return (
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                </Nav>
            );
        } else if( jwt_decode(token).role === 'Professor'){
            return (
                <Nav>
                    <Nav.Link href="/dicas">Dicas</Nav.Link>
                    <Nav.Link href="/categorias">Categorias</Nav.Link>
                    <Nav.Link href="/professor">Menu de Professor</Nav.Link>
                    <NavDropdown title={jwt_decode(token).nameid} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={ event => sair(event)}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <Nav.Link href="/dicas">Dicas</Nav.Link>
                    <Nav.Link href="/aluno">Menu Aluno</Nav.Link>
                    <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={ event => sair(event)}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }

        
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">EduX</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                
                { renderMenu() }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu;