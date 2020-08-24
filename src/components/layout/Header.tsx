import React, {useState, useEffect} from 'react';
import {History} from 'history';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {IStoreState} from '../../types';
import {setToken} from '../../actions/auth';

type PropType = RouteComponentProps & {
    history: History;
    token: string | null;
    setToken: (token: string) => void;
};

const Header: React.FC<PropType> = ({history, token, setToken}) => {
    const [currentURL, setCurrentURL] = useState(history.location.pathname);
    const [tokenValue, setTokenValue] = useState('');

    useEffect(() => {
        setCurrentURL(history.location.pathname);
    }, [history.location.pathname]);

    useEffect(() => {
        if (token !== null) setTokenValue(token);
    }, [token]);

    const setActive = (navLink: string) =>
        navLink === currentURL ? 'active' : '';

    const onTokenSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setToken(tokenValue);
    };
    const onTokenChange = (e: React.ChangeEvent<any>) => {
        setTokenValue(e.currentTarget.value);
    };

    return (
        <header className="fixed-top">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Блог</Navbar.Brand>
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
                        </Nav>
                        <Form inline onSubmit={onTokenSubmit}>
                            <Form.Control
                                type="text"
                                placeholder="Токен"
                                className="mr-sm-2"
                                value={tokenValue}
                                onChange={onTokenChange}
                            />
                            <Button type="submit" variant="outline-success">
                                Применить
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps, {setToken})(withRouter(Header));
