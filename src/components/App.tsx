import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../pages/Home';
import User from '../pages/User';
import Post from '../pages/Post';
import NotFound from '../pages/NotFound';
import Header from './layout/Header';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/user/:id" component={User} />
                    <Route exact path="/post/:id" component={Post} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default connect(null, null)(App);
