import {BASE_URL} from '../constants';
import {GET_USER, GET_USERS, GET_PAGINATION_DATA, SET_LOADING} from '../types';

export const getUsers = (page: number) => (dispatch: any) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/users?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({data}) => {
            dispatch({
                type: GET_USERS,
                payload: data.map(({id, name, email}: any) => ({
                    id,
                    name,
                    email,
                })),
            });
        })
        .catch((error) => console.error(error));
};

export const getUser = (id: string) => (dispatch: any) => {
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
        .catch((error) => console.error(error));
};

export const getUserPagination = () => (dispatch: any) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/users`;

    fetch(url)
        .then((res) => res.json())
        .then(({meta}) => {
            dispatch({
                type: GET_PAGINATION_DATA,
                payload: {
                    total: meta.pagination.total,
                    pages: meta.pagination.pages,
                },
            });
        })
        .catch((error) => console.error(error));
};

export const setLoading = () => ({type: SET_LOADING});
