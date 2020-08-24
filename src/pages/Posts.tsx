import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';

import {IPost, IStoreState} from '../types';
import {getPosts} from '../actions/post';

interface IProps {
    posts: IPost[];
    loading: boolean;
    getPosts: (page: number) => void;
}

const Posts: React.FC<IProps> = ({posts, loading, getPosts}) => {
    useEffect(() => {
        getPosts(1);
        // todo cleanup
    }, []);

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
                        <tr>
                            <td>{index + 1}</td>
                            <td>{post.title}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    posts: state.post.posts,
    loading: state.post.loading,
});

export default connect(mapStateToProps, {getPosts})(Posts);
