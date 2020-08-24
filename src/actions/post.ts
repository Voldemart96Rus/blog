import {BASE_URL} from '../constants';
import {GET_POSTS, GET_POST, SET_LOADING} from '../types';

export const getPosts = (page: number) => (dispatch: any) => {
    dispatch(setLoading());

    const url = `${BASE_URL}/posts?page=${page}`;

    fetch(url)
        .then((res) => res.json())
        .then(({data}) => {
            dispatch({
                type: GET_POSTS,
                payload: data,
            });
        })
        .catch((error) => console.error(error));
};

export const getPost = (id: string) => (dispatch: any) => {
    dispatch(setLoading());

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

export const setLoading = () => ({type: SET_LOADING});
