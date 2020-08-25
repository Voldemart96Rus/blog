import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Errors from '../components/layout/Errors';
import Comments from '../components/Comments';
import ReturnButton from '../components/layout/ReturnButton';
import Preloader from '../components/layout/Preloader';
import {IPost, IError, IStoreState} from '../types';
import {getPost, deletePostError} from '../actions/post';

interface IMatchParams {
    id: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
    post: IPost | null;
    loading: boolean;
    errors: IError[];
    getPost: (id: string) => void;
    deletePostError: (id: string) => void;
}

const Post: React.FC<IProps> = ({
    match,
    post,
    errors,
    loading,
    history,
    getPost,
    deletePostError,
}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    if (loading) {
        return <Preloader />;
    }

    return (
        <main className="main">
            <ReturnButton onClick={() => history.push('/posts')} />
            <Errors errors={errors} deleteError={deletePostError} />
            {post && (
                <Card className="post-card">
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>{post.body}</p>
                        </blockquote>
                    </Card.Body>
                </Card>
            )}
            {post && post.comments && <Comments />}
        </main>
    );
};
// todo history
//todo test errors

const mapStateToProps = (state: IStoreState) => ({
    post: state.post.post,
    errors: state.post.errors,
    loading: state.post.loading,
});

export default connect(mapStateToProps, {getPost, deletePostError})(Post);
