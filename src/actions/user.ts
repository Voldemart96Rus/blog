import {Dispatch} from 'react';
import {v4 as uuidv4} from 'uuid';

import {BASE_URL, SERVER_ERROR} from '../constants';
import {
    GET_USER,
    GET_USERS,
    USER_ERROR,
    CLEAN_USERS,
    DELETE_USER_ERROR,
    SET_USER_POSTS_AND_PAGE,
    SET_USERS_PAGE,
    SetLoadingAction,
    CleanUsersAction,
    GetUserAction,
    GetUsersAction,
    SetUsersPageAction,
    SetUserPostsAndPageAction,
    UserErrorAction,
    DeleteUserErrorAction,
    IUser,
} from '../types';

import {setLoading} from './app';

export const getUsers = (page: number) => (
    dispatch: Dispatch<SetLoadingAction | GetUsersAction | UserErrorAction>
) => {
    dispatch(setLoading());

    const userURL = `${BASE_URL}/users?page=${page}`;

    fetch(userURL)
        .then((res) => res.json())
        .then(({code, meta, data}) => {
            if (code >= 400) {
                dispatch({
                    type: USER_ERROR,
                    payload: {id: uuidv4(), code, message: data.message},
                });
            } else {
                dispatch({
                    type: GET_USERS,
                    payload: {
                        users: data.map(({id, name, email}: IUser) => ({
                            id,
                            name,
                            email,
                        })),
                        pagination: meta.pagination,
                    },
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: USER_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const getUser = (id: string) => (
    dispatch: Dispatch<SetLoadingAction | GetUserAction | UserErrorAction>
) => {
    dispatch(setLoading());

    const userURL = `${BASE_URL}/users/${id}`;
    const postURL = `${BASE_URL}/users/${id}/posts`;

    fetch(userURL)
        .then((res) => res.json())
        .then(({code, data: userData}) => {
            if (code >= 400) {
                dispatch({
                    type: USER_ERROR,
                    payload: {id: uuidv4(), code, message: userData.message},
                });
            } else {
                fetch(postURL)
                    .then((res) => res.json())
                    .then(({code, meta, data: postData}) => {
                        if (code >= 400) {
                            dispatch({
                                type: GET_USER,
                                payload: userData,
                            });
                            dispatch({
                                type: USER_ERROR,
                                payload: {
                                    id: uuidv4(),
                                    code,
                                    message: postData.message,
                                },
                            });
                        } else {
                            dispatch({
                                type: GET_USER,
                                payload: {
                                    user: {...userData, posts: postData},
                                    postPagination: meta.pagination,
                                },
                            });
                        }
                    });
            }
        })
        .catch((error) => {
            dispatch({
                type: USER_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const deleteUserError = (id: string) => (
    dispatch: Dispatch<DeleteUserErrorAction>
) =>
    dispatch({
        type: DELETE_USER_ERROR,
        payload: id,
    });

export const setUsersPage = (page: number) => (
    dispatch: Dispatch<SetUsersPageAction>
) => {
    dispatch({
        type: SET_USERS_PAGE,
        payload: page,
    });
};

export const setUserPostsAndPage = (userId: string, page: number) => (
    dispatch: Dispatch<
        SetUserPostsAndPageAction | SetLoadingAction | UserErrorAction
    >
) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/users/${userId}/posts?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({code, data}) => {
            if (code >= 400) {
                dispatch({
                    type: USER_ERROR,
                    payload: {id: uuidv4(), code, message: data.message},
                });
            } else {
                dispatch({
                    type: SET_USER_POSTS_AND_PAGE,
                    payload: {page, posts: data},
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: USER_ERROR,
                payload: {
                    id: uuidv4(),
                    ...SERVER_ERROR,
                },
            });
            console.error(error);
        });
};

export const cleanUsers = () => (dispatch: Dispatch<CleanUsersAction>) =>
    dispatch({type: CLEAN_USERS});
