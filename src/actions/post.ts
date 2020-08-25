import {Dispatch} from 'react';
import {v4 as uuidv4} from 'uuid';

import {BASE_URL} from '../constants';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    CLEAN_POSTS,
    DELETE_POST_ERROR,
    SET_POSTS_PAGE,
    SetLoadingAction,
    CleanPostsAction,
    GetPostAction,
    GetPostsAction,
    PostErrorAction,
    SetPostsPageAction,
    DeletePostErrorAction,
} from '../types';
import {setLoading} from './app';

export const getPosts = (page: number) => (
    dispatch: Dispatch<SetLoadingAction | GetPostsAction>
) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/posts?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({meta: {pagination}, data}) => {
            dispatch({
                type: GET_POSTS,
                payload: {pagination, posts: data},
            });
        })
        .catch((error) => {
            dispatch(setLoading(false));
            console.error(error);
        });
};

export const getPost = (id: string) => (
    dispatch: Dispatch<SetLoadingAction | GetPostAction | PostErrorAction>
) => {
    dispatch(setLoading());

    const postUrl = `${BASE_URL}/posts/${id}`;
    const commentsUrl = `${BASE_URL}/comments?post_id=${id}`;
    let post = null;

    fetch(postUrl)
        .then((res) => res.json())
        .then(({code, data: postData}) => {
            if (code !== 200) {
                dispatch({
                    type: POST_ERROR,
                    payload: {id: uuidv4(), code, message: postData.message},
                });
            } else {
                fetch(commentsUrl)
                    .then((res) => res.json())
                    .then(({code, data: commentData}) => {
                        if (code !== 200) {
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
                                payload: {...postData, comments: commentData},
                            });
                        }
                    });
            }
        })
        .catch((error) => {
            dispatch(setLoading(false));
            // todo dispatch error
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

export const cleanPosts = () => (dispatch: Dispatch<CleanPostsAction>) =>
    dispatch({type: CLEAN_POSTS});
