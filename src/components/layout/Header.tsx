import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <header className="fixed-top">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Блог</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/users">Пользователи</Nav.Link>
                            <Nav.Link href="/posts">Посты</Nav.Link>
                        </Nav>
                        <Form inline>
                            <Form.Control
                                type="text"
                                placeholder="Токен"
                                className="mr-sm-2"
                            />
                            <Button variant="outline-success">Применить</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
