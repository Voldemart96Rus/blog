import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

import Errors from '../components/layout/Errors';
import Preloader from '../components/layout/Preloader';
import ReturnButton from '../components/layout/ReturnButton';
import {IExtendedUser, IError, IPagination, IStoreState} from '../types';
import {getUser, deleteUserError, setUserPostsAndPage} from '../actions/user';
import PostsTable from '../components/PostsTable';
import CustomPagination from '../components/layout/CustomPagination';
import './User.css';

interface IMatchParams {
    id: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
    user: IExtendedUser | null;
    loading: boolean;
    errors: IError[];
    pagination: IPagination;
    activePage: number;
    getUser: (id: string) => void;
    deleteUserError: (id: string) => void;
    setUserPostsAndPage: (userId: string, page: number) => void;
}

const User: React.FC<IProps> = ({
    match,
    user,
    errors,
    history,
    loading,
    pagination: {total, limit, pages},
    activePage,
    getUser,
    setUserPostsAndPage,
    deleteUserError,
}) => {
    useEffect(() => {
        getUser(match.params.id);
    }, [getUser, match.params.id]);

    const setActivePage = (page: number): void => {
        if (user) setUserPostsAndPage(user.id, page);
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <main className="main">
            <ReturnButton onClick={() => history.push('/users')} />
            <Errors errors={errors} deleteError={deleteUserError} />
            {user && (
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
                            variant={
                                user.status === 'Active' ? 'success' : 'danger'
                            }
                        >
                            {user.status}
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
                                    <dd>
                                        {user.gender === 'Male'
                                            ? 'Мужчина'
                                            : 'Женщина'}
                                    </dd>
                                </div>
                            </dl>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            {user && user.posts && user.posts.length > 0 && (
                <section className="my-4">
                    <h2 className="h4 mb-3">Посты пользователя {user.name}</h2>
                    <PostsTable
                        posts={user.posts}
                        activePage={activePage}
                        onClick={(id: string) => history.push(`/posts/${id}`)}
                    />
                    {total > limit && (
                        <CustomPagination
                            pages={pages}
                            activePage={activePage}
                            setActivePage={setActivePage}
                        />
                    )}
                </section>
            )}
            {user && user.posts && user.posts.length === 0 && (
                <h2 className="h4 my-4">У {user.name} нет постов</h2>
            )}
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    user: state.user.user,
    activePage: state.user.postsPage,
    pagination: state.user.postPagination,
    errors: state.user.errors,
    loading: state.user.loading,
});

export default connect(mapStateToProps, {
    getUser,
    deleteUserError,
    setUserPostsAndPage,
})(User);
