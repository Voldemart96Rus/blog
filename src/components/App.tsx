import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import Users from '../pages/Users';
import Posts from '../pages/Posts';
import User from '../pages/User';
import Post from '../pages/Post';
import NotFound from '../pages/NotFound';
import Header from './layout/Header';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Container className="page-container">
                <Switch>
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/user/:id" component={User} />
                    <Route exact path="/post/:id" component={Post} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Router>
    );
};

export default connect(null, null)(App);
