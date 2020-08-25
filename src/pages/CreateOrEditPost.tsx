import React, {useState, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Alerts from '../components/layout/Alerts';
import Errors from '../components/layout/Errors';
import ReturnButton from '../components/layout/ReturnButton';
import Preloader from '../components/layout/Preloader';
import {IPostFields, IError, IStoreState, IPost} from '../types';
import {
    createPost,
    deletePostError,
    getPost,
    updatePost,
} from '../actions/post';

interface IMatchParams {
    id: string;
}

type IProps = RouteComponentProps<IMatchParams> & {
    loading: boolean;
    currentPost: IPost | null;
    errors: IError[];
    token: string | null;
    history: History;
    createPost: (post: IPostFields) => void;
    updatePost: (post: IPostFields) => void;
    deletePostError: (id: string) => void;
    getPost: (id: string) => void;
};

const CreateOrEditPost: React.FC<IProps> = ({
    location,
    currentPost,
    errors,
    loading,
    token,
    history,
    createPost,
    updatePost,
    deletePostError,
    getPost,
}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get('post_id');
        if (id !== null) {
            setId(id);
            getPost(id);
        }
    }, [location.search, getPost]);

    useEffect(() => {
        if (currentPost) {
            setTitle(currentPost.title);
            setBody(currentPost.body);
        }
    }, [currentPost]);

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.currentTarget.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (id) updatePost({id, title, body});
        else createPost({title, body});
        setTitle('');
        setBody('');
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <main className="main">
            <ReturnButton onClick={() => history.goBack()} />
            <Alerts />
            <Errors errors={errors} deleteError={deletePostError} />
            {!token && (
                <Alert variant="warning">
                    Авторизуйтесь с помощью токена для создания поста.
                </Alert>
            )}
            <h2 className="h4">
                {id ? 'Редактирование поста' : 'Создание нового поста'}
            </h2>
            <Form className="mt-4" onSubmit={onSubmit}>
                <Form.Group controlId="post-title">
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите заголовок"
                        value={title}
                        onChange={onTitleChange}
                    />
                </Form.Group>
                <Form.Group controlId="post-body">
                    <Form.Label>Текст поста</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={body}
                        onChange={onBodyChange}
                        placeholder="Введите текст поста"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!token || !title.trim() || !body.trim()}
                >
                    {id ? 'Редактировать' : 'Создать'}
                </Button>
            </Form>
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    errors: state.post.errors,
    currentPost: state.post.post,
    token: state.auth.token,
});

export default connect(mapStateToProps, {
    getPost,
    createPost,
    updatePost,
    deletePostError,
})(withRouter(CreateOrEditPost));
