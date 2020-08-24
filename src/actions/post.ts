import {Dispatch} from 'react';

import {BASE_URL} from '../constants';
import {
    GET_POSTS,
    GET_POST,
    SET_LOADING,
    CLEAN_POSTS,
    SetLoadingAction,
    CleanPostsAction,
    GetPostAction,
    GetPostsAction,
} from '../types';

export const getPosts = (page: number) => (
    dispatch: Dispatch<SetLoadingAction | GetPostsAction>
) => {
    dispatch(setLoading);

    const url = `${BASE_URL}/posts?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({meta: {pagination}, data}) => {
            dispatch({
                type: GET_POSTS,
                payload: {pagination, posts: data},
            });
        })
        .catch((error) => console.error(error));
};

export const getPost = (id: string) => (
    dispatch: Dispatch<SetLoadingAction | GetPostAction>
) => {
    dispatch(setLoading);

    const url = `${BASE_URL}/posts/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then(({data}) => {
            dispatch({
                type: GET_POST,
                payload: data,
            });
        })
        .catch((error) => console.error(error));
};

export const cleanPosts = () => (dispatch: Dispatch<CleanPostsAction>) =>
    dispatch({type: CLEAN_POSTS});

const setLoading: SetLoadingAction = {type: SET_LOADING};
