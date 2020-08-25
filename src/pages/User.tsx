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
import PostsTable from '../components/layout/PostsTable';
import CustomPagination from '../components/layout/CustomPagination';
import './User.css';

type IProps = RouteComponentProps & {
    user: IExtendedUser;
    loading: boolean;
    errors: IError[];
    history: History;
    match: {params: {id: string}};
    pagination: IPagination;
    activePage: number;
    getUser: (id: string) => void;
    deleteUserError: (id: string) => void;
    setUserPostsAndPage: (userId: string, page: number) => void;
};

// todo switch
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
        setUserPostsAndPage(user.id, page);
    };

    if (errors.length) {
        return (
            <>
                <ReturnButton onClick={() => history.push('/users')} />
                <Errors errors={errors} deleteError={deleteUserError} />;
            </>
        );
    }

    if (loading) {
        return <Preloader />;
    }

    return (
        user && (
            <>
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
                {user.posts && (
                    <section className="my-5">
                        <h2>Посты пользователя {user.name}</h2>
                        <PostsTable
                            posts={user.posts}
                            activePage={activePage}
                            onClick={(id: string) =>
                                history.push(`/posts/${id}`)
                            }
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
            </>
        )
    );
};

const mapStateToProps = (state: any) => ({
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
