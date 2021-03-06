import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import Users from '../pages/Users';
import Posts from '../pages/Posts';
import User from '../pages/User';
import Post from '../pages/Post';
import CreateOrEditPost from '../pages/CreateOrEditPost';
import NotFound from '../pages/NotFound';
import Header from './layout/Header';
import './App.css';

const App: React.FC = () => (
    <Router>
        <Header />
        <Container className="page-container">
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/users" />} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/users/:id" component={User} />
                <Route exact path="/posts/:id" component={Post} />
                <Route
                    exact
                    path="/create-or-edit-post"
                    component={CreateOrEditPost}
                />
                <Route component={NotFound} />
            </Switch>
        </Container>
    </Router>
);

export default connect(null, null)(App);
