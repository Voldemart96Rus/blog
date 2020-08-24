import React, {useEffect} from 'react';
import {History} from 'history';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';

import {IPost, IStoreState, IPagination} from '../types';
import {getPosts, cleanPosts, setPostsPage} from '../actions/post';
import {getPaginationItems} from '../utils';

type PropType = RouteComponentProps & {
    posts: IPost[];
    pagination: IPagination;
    loading: boolean;
    activePage: number;
    history: History;
    getPosts: (page: number) => void;
    cleanPosts: () => void;
    setPostsPage: (page: number) => void;
};

const Posts: React.FC<PropType> = ({
    posts,
    loading,
    pagination: {total, pages, limit},
    history,
    activePage,
    getPosts,
    cleanPosts,
    setPostsPage,
}) => {
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
                        <tr
                            key={post.id}
                            onClick={() => history.push(`/posts/${post.id}`)}
                        >
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
                    <Pagination.First onClick={() => setPostsPage(1)} />
                    <Pagination.Prev
                        onClick={() =>
                            setPostsPage(Math.max(activePage - 1, 1))
                        }
                    />
                    {getPaginationItems(pages, activePage, setPostsPage)}
                    <Pagination.Next
                        onClick={() =>
                            setPostsPage(Math.min(activePage + 1, pages))
                        }
                    />
                    <Pagination.Last onClick={() => setPostsPage(pages)} />
                </Pagination>
            )}
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    posts: state.post.posts,
    loading: state.post.loading,
    activePage: state.post.page,
    pagination: state.post.pagination,
});

export default connect(mapStateToProps, {getPosts, cleanPosts, setPostsPage})(
    withRouter(Posts)
);
