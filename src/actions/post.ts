import {Dispatch} from 'react';
import {v4 as uuidv4} from 'uuid';

import {BASE_URL, SERVER_ERROR} from '../constants';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    CLEAN_POSTS,
    DELETE_POST_ERROR,
    SET_POSTS_PAGE,
    SET_COMMENTS_AND_PAGE,
    IPostFields,
    SetLoadingAction,
    CleanPostsAction,
    GetPostAction,
    GetPostsAction,
    PostErrorAction,
    SetPostsPageAction,
    SetCommentsAndPageAction,
    DeletePostErrorAction,
    SetAlertAction,
} from '../types';
import {setLoading} from './app';
import {setAlert} from './alert';
import store from '../store';

export const getPosts = (page: number) => (
    dispatch: Dispatch<SetLoadingAction | GetPostsAction | PostErrorAction>
) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/posts?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({code, meta, data}) => {
            if (code >= 400) {
                dispatch({
                    type: POST_ERROR,
                    payload: {id: uuidv4(), code, message: data.message},
                });
            } else {
                dispatch({
                    type: GET_POSTS,
                    payload: {pagination: meta.pagination, posts: data},
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const getPost = (id: string) => (
    dispatch: Dispatch<SetLoadingAction | GetPostAction | PostErrorAction>
) => {
    dispatch(setLoading());

    const postURL = `${BASE_URL}/posts/${id}`;
    const commentsUrl = `${BASE_URL}/comments?post_id=${id}`;

    fetch(postURL)
        .then((res) => res.json())
        .then(({code, data: postData}) => {
            if (code >= 400) {
                dispatch({
                    type: POST_ERROR,
                    payload: {id: uuidv4(), code, message: postData.message},
                });
            } else {
                fetch(commentsUrl)
                    .then((res) => res.json())
                    .then(({code, meta, data: commentData}) => {
                        if (code >= 400) {
                            dispatch({
                                type: GET_POST,
                                payload: postData,
                            });
                            dispatch({
                                type: POST_ERROR,
                                payload: {
                                    id: uuidv4(),
                                    code,
                                    message: commentData.message,
                                },
                            });
                        } else {
                            dispatch({
                                type: GET_POST,
                                payload: {
                                    post: {...postData, comments: commentData},
                                    commentPagination: meta.pagination,
                                },
                            });
                        }
                    });
            }
        })
        .catch((error) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const createPost = (post: IPostFields) => (
    dispatch: Dispatch<
        SetLoadingAction | GetPostsAction | SetAlertAction | PostErrorAction
    >
) => {
    const {token} = store.getState().auth;
    const url = `${BASE_URL}/posts`;

    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: 'user', user_id: '1', ...post}),
    })
        .then((res) => res.json())
        .then(({code, data}) => {
            if (code >= 400) {
                dispatch({
                    type: POST_ERROR,
                    payload: {id: uuidv4(), code, message: data.message},
                });
            } else {
                dispatch(
                    setAlert({
                        id: uuidv4(),
                        message: 'Новый пост создан',
                        link: `/posts/${data.id}`,
                    })
                );
            }
        })
        .catch((error) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const updatePost = (post: IPostFields) => (
    dispatch: Dispatch<
        SetLoadingAction | GetPostsAction | SetAlertAction | PostErrorAction
    >
) => {
    const {token} = store.getState().auth;
    const url = `${BASE_URL}/posts/${post.id}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...post}),
    })
        .then((res) => res.json())
        .then(({code, data}) => {
            if (code >= 400) {
                dispatch({
                    type: POST_ERROR,
                    payload: {id: uuidv4(), code, message: data.message},
                });
            } else {
                dispatch(
                    setAlert({
                        id: uuidv4(),
                        message: 'Пост отредактирован',
                        link: `/posts/${data.id}`,
                    })
                );
            }
        })
        .catch((error) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const deletePostError = (id: string) => (
    dispatch: Dispatch<DeletePostErrorAction>
) =>
    dispatch({
        type: DELETE_POST_ERROR,
        payload: id,
    });

export const setPostsPage = (page: number) => (
    dispatch: Dispatch<SetPostsPageAction>
) => {
    dispatch({
        type: SET_POSTS_PAGE,
        payload: page,
    });
};

export const setCommentsAndPage = (postId: string, page: number) => (
    dispatch: Dispatch<
        SetCommentsAndPageAction | SetLoadingAction | PostErrorAction
    >
) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/posts/${postId}/comments?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({code, data}) => {
            if (code >= 400) {
                dispatch({
                    type: POST_ERROR,
                    payload: {id: uuidv4(), code, message: data.message},
                });
            } else {
                dispatch({
                    type: SET_COMMENTS_AND_PAGE,
                    payload: {page, comments: data},
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const cleanPosts = () => (dispatch: Dispatch<CleanPostsAction>) =>
    dispatch({type: CLEAN_POSTS});
