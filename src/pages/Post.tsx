import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card';

import Errors from '../components/layout/Errors';
import Comments from '../components/Comments';
import {IPost, IError, IStoreState} from '../types';
import {getPost, deletePostError} from '../actions/post';

interface IProps {
    post: IPost;
    loading: boolean;
    errors: IError[];
    match: {params: {id: string}};
    getPost: (id: string) => void;
    deletePostError: (id: string) => void;
}

const Post: React.FC<IProps> = ({
    match,
    post,
    errors,
    loading,
    getPost,
    deletePostError,
}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    if (errors.length) {
        return <Errors errors={errors} deleteError={deletePostError} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        post && (
            <>
                <Card className="post-card">
                    <Card>
                        <Card.Header>{post.title}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>{post.body}</p>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Card>
                {post.comments && <Comments comments={post.comments} />}
            </>
        )
    );
};

const mapStateToProps = (state: any) => ({
    post: state.post.post,
    errors: state.post.errors,
    loading: state.post.loading,
});

export default connect(mapStateToProps, {getPost, deletePostError})(Post);
