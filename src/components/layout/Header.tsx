import React, {useState, useEffect} from 'react';
import {History} from 'history'; //todo
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import TokenForm from '../TokenForm';
import './Header.css';

type PropType = RouteComponentProps & {
    history: History;
};

const Header: React.FC<PropType> = ({history}) => {
    const [currentURL, setCurrentURL] = useState(history.location.pathname);

    useEffect(() => {
        setCurrentURL(history.location.pathname);
    }, [history.location.pathname]);

    const setActive = (navLink: string) =>
        navLink === currentURL ? 'active' : '';

    return (
        <header className="fixed-top">
            <Navbar bg="light" expand="lg">
                <Container className="d-flex align-items-baseline">
                    <Navbar.Brand className="brand" href="/">
                        <img
                            className="brand-icon"
                            src="/favicon.svg"
                            alt="Логотип"
                            title="Blog"
                        />
                        log
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link
                                href="/users"
                                className={setActive('/users')}
                            >
                                Пользователи
                            </Nav.Link>
                            <Nav.Link
                                href="/posts"
                                className={setActive('/posts')}
                            >
                                Посты
                            </Nav.Link>
                            <Nav.Link
                                href="/create-post"
                                className={setActive('/create-post')}
                            >
                                Новый пост
                            </Nav.Link>
                        </Nav>
                        <TokenForm />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default withRouter(Header);
