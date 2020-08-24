import {BASE_URL} from '../constants';
import {SET_LOADING, GET_POSTS} from '../actions/types';

export const getUserPosts = (id: string) => (dispatch: any) => {
    console.info(id);
    const url = `${BASE_URL}/users/${id}/posts`;
    // dispatch(setLoading());

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

export const setLoading = () => ({type: SET_LOADING});
