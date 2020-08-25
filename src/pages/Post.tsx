import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import Errors from '../components/layout/Errors';
import Comments from '../components/Comments';
import ReturnButton from '../components/layout/ReturnButton';
import Preloader from '../components/layout/Preloader';
import {IPost, IError, IStoreState} from '../types';
import {getPost, deletePostError} from '../actions/post';

type IProps = RouteComponentProps & {
    post: IPost;
    loading: boolean;
    history: History;
    errors: IError[];
    match: {params: {id: string}};
    getPost: (id: string) => void;
    deletePostError: (id: string) => void;
};

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

    if (errors.length) {
        return (
            <>
                <ReturnButton onClick={() => history.push('/posts')} />
                <Errors errors={errors} deleteError={deletePostError} />
            </>
        );
    }

    if (loading) {
        return <Preloader />;
    }

    return (
        post && (
            <>
                <ReturnButton onClick={() => history.push('/posts')} />
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
                {post.comments && <Comments />}
            </>
        )
    );
};

const mapStateToProps = (state: any) => ({
    post: state.post.post,
    errors: state.post.errors,
    loading: state.post.loading,
});

export default connect(mapStateToProps, {getPost, deletePostError})(
    withRouter(Post)
);
