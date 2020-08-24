import React, {useEffect, useState} from 'react';
import {History} from 'history';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';

import {IPost, IStoreState, IPagination} from '../types';
import {getPosts, cleanPosts} from '../actions/post';
import {getPaginationItems} from '../utils';

type PropType = RouteComponentProps & {
    posts: IPost[];
    pagination: IPagination;
    loading: boolean;
    history: History;
    getPosts: (page: number) => void;
    cleanPosts: () => void;
};

const Posts: React.FC<PropType> = ({
    posts,
    loading,
    pagination: {total, pages, limit},
    history,
    getPosts,
    cleanPosts,
}) => {
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        getPosts(activePage);
        return () => {
            cleanPosts();
        };
    }, [activePage, getPosts, cleanPosts]);

    // <Preloader />
    return loading ? (
        <main>Loading...</main>
    ) : (
        <main className="main">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Заголовок</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post: IPost, index: number) => (
                        <tr onClick={() => history.push(`/posts/${post.id}`)}>
                            <td>
                                {index + (activePage - 1) * posts.length + 1}
                            </td>
                            <td>{post.title}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {total > limit && (
                <Pagination>
                    <Pagination.First onClick={() => setActivePage(1)} />
                    <Pagination.Prev
                        onClick={() =>
                            setActivePage(Math.max(activePage - 1, 1))
                        }
                    />
                    {getPaginationItems(pages, activePage, setActivePage)}
                    <Pagination.Next
                        onClick={() =>
                            setActivePage(Math.min(activePage + 1, pages))
                        }
                    />
                    <Pagination.Last onClick={() => setActivePage(pages)} />
                </Pagination>
            )}
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    posts: state.post.posts,
    loading: state.post.loading,
    pagination: state.post.pagination,
});

export default connect(mapStateToProps, {getPosts, cleanPosts})(
    withRouter(Posts)
);
