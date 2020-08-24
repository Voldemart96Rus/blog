import {BASE_URL} from '../constants';
import {GET_USER, GET_USERS, SET_LOADING, GET_POSTS} from '../actions/types';

export const getUsers = (page: number) => (dispatch: any) => {
    const url = `${BASE_URL}/users?page=${page}`;

    dispatch(setLoading());

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
    const url = `${BASE_URL}/users/${id}`;

    dispatch(setLoading());

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

export const setLoading = () => ({type: SET_LOADING});
