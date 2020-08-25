import React, {useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Alerts from '../components/layout/Alerts';
import Errors from '../components/layout/Errors';
import ReturnButton from '../components/layout/ReturnButton';
import Preloader from '../components/layout/Preloader';
import {IPostFields, IError, IStoreState} from '../types';
import {createPost, deletePostError} from '../actions/post';

type IProps = RouteComponentProps & {
    loading: boolean;
    errors: IError[];
    token: string | null;
    history: History;
    createPost: (post: IPostFields) => void;
    deletePostError: (id: string) => void;
};

const CreatePost: React.FC<IProps> = ({
    errors,
    loading,
    token,
    history,
    createPost,
    deletePostError,
}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.currentTarget.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        createPost({title, body});
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
            <h2 className="h4">Создание нового поста</h2>
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
                    Создать
                </Button>
            </Form>
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    errors: state.post.errors,
    token: state.auth.token,
});

export default connect(mapStateToProps, {createPost, deletePostError})(
    withRouter(CreatePost)
);
