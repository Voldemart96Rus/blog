import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {getUser} from '../actions/user';
import {ReturnButton} from '../components/layout/ReturnButton';

import './User.css';

type IProps = RouteComponentProps & {
    user: any;
    loading: boolean;
    history: History;
    match: {params: {id: string}};
    getUser: (id: string) => void;
};

const STATUS_MAP: any = {
    Inactive: {
        text: 'Офлайн',
        variant: 'danger',
    },
    Active: {
        text: 'Онлайн',
        variant: 'success',
    },
};

const GENDER_MAP: any = {
    Male: 'Мужской',
    Female: 'Женский',
};

const User: React.FC<IProps> = ({match, user, loading, history, getUser}) => {
    useEffect(() => {
        getUser(match.params.id);
    }, [getUser, match.params.id]);

    // <Preloader />
    return loading || user === null ? (
        <div>Loading...</div>
    ) : (
        <div>
            <ReturnButton onClick={() => history.push('/users')} />
            <Card className="user-card">
                <Card.Header className="user-card-header">
                    <img
                        src="/images/user.svg"
                        className="user-icon"
                        alt="Пользователь"
                    />
                    <span className="username">{user.name}</span>
                    <Badge
                        className="user-status"
                        variant={STATUS_MAP[user.status].variant}
                    >
                        {STATUS_MAP[user.status].text}
                    </Badge>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <dl>
                            <div className="user-definition-group">
                                <dt className="user-definition-term mr-3">
                                    Email:
                                </dt>
                                <dd>{user.email}</dd>
                            </div>
                            <div className="user-definition-group">
                                <dt className="user-definition-term mr-3">
                                    Пол:
                                </dt>
                                <dd>{GENDER_MAP[user.gender]}</dd>
                            </div>
                        </dl>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    loading: state.user.loading,
});

export default connect(mapStateToProps, {getUser})(withRouter(User));
