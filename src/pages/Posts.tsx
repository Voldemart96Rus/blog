import React, {useEffect} from 'react';
import {History} from 'history';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import Errors from '../components/layout/Errors';
import Preloader from '../components/layout/Preloader';
import CustomPagination from '../components/layout/CustomPagination';
import PostsTable from '../components/PostsTable';
import {IPost, IError, IStoreState, IPagination} from '../types';
import {
    getPosts,
    cleanPosts,
    setPostsPage,
    deletePostError,
} from '../actions/post';

type PropType = RouteComponentProps & {
    posts: IPost[];
    pagination: IPagination;
    errors: IError[];
    loading: boolean;
    activePage: number;
    history: History;
    getPosts: (page: number) => void;
    cleanPosts: () => void;
    setPostsPage: (page: number) => void;
    deletePostError: (id: string) => void;
};

const Posts: React.FC<PropType> = ({
    posts,
    loading,
    pagination: {total, pages, limit},
    errors,
    history,
    activePage,
    getPosts,
    cleanPosts,
    setPostsPage,
    deletePostError,
}) => {
    useEffect(() => {
        getPosts(activePage);
        return () => {
            cleanPosts();
        };
    }, [activePage, getPosts, cleanPosts]);

    const onPostClick = (id: string) => history.push(`/posts/${id}`);

    if (errors.length) {
        return <Errors errors={errors} deleteError={deletePostError} />;
    }

    if (loading) {
        return <Preloader />;
    }

    return (
        <main className="main paginated-page">
            <Errors errors={errors} deleteError={deletePostError} />
            {posts.length > 0 && (
                <PostsTable
                    posts={posts}
                    activePage={activePage}
                    onClick={onPostClick}
                />
            )}
            {total > limit && (
                <CustomPagination
                    pages={pages}
                    activePage={activePage}
                    setActivePage={setPostsPage}
                />
            )}
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    posts: state.post.posts,
    loading: state.post.loading,
    errors: state.post.errors,
    activePage: state.post.page,
    pagination: state.post.pagination,
});

export default connect(mapStateToProps, {
    getPosts,
    cleanPosts,
    setPostsPage,
    deletePostError,
})(withRouter(Posts));
