import React, {useEffect} from 'react';
import {History} from 'history';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {IPost, IStoreState, IPagination} from '../types';
import {getPosts, cleanPosts, setPostsPage} from '../actions/post';
import CustomPagination from '../components/layout/CustomPagination';
import PostsTable from '../components/layout/PostsTable';

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

    const onPostClick = (id: string) => history.push(`/posts/${id}`);

    return loading ? (
        <main>Loading...</main>
    ) : (
        <main className="main">
            <PostsTable
                posts={posts}
                activePage={activePage}
                onClick={onPostClick}
            />
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
    activePage: state.post.page,
    pagination: state.post.pagination,
});

export default connect(mapStateToProps, {getPosts, cleanPosts, setPostsPage})(
    withRouter(Posts)
);
