import {Dispatch} from 'react';

import {BASE_URL} from '../constants';
import {
    GET_USER,
    GET_USERS,
    CLEAN_USERS,
    SET_USERS_PAGE,
    SetLoadingAction,
    CleanUsersAction,
    GetUserAction,
    GetUsersAction,
    SetUsersPageAction,
} from '../types';

import {setLoading} from './app';

export const getUsers = (page: number) => (
    dispatch: Dispatch<SetLoadingAction | GetUsersAction>
) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/users?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({meta: {pagination}, data}) => {
            dispatch({
                type: GET_USERS,
                payload: {
                    users: data.map(({id, name, email}: any) => ({
                        id,
                        name,
                        email,
                    })),
                    pagination,
                },
            });
        })
        .catch((error) => {
            dispatch(setLoading(false));
            console.error(error);
        });
};

export const getUser = (id: string) => (
    dispatch: Dispatch<SetLoadingAction | GetUserAction>
) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/users/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then(({data}) => {
            dispatch({
                type: GET_USER,
                payload: data,
            });
        })
        .catch((error) => {
            dispatch(setLoading(false));
            console.error(error);
        });
};

export const setUsersPage = (page: number) => (
    dispatch: Dispatch<SetUsersPageAction>
) => {
    dispatch({
        type: SET_USERS_PAGE,
        payload: page,
    });
};

export const cleanUsers = () => (dispatch: Dispatch<CleanUsersAction>) =>
    dispatch({type: CLEAN_USERS});
