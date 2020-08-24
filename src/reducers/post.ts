import {GET_POST, GET_POSTS, SET_LOADING} from '../types';
import {IPostState, PostActionTypes} from '../types';

const initialState: IPostState = {
    posts: [],
    post: null,
    loading: false,
};

export default (state = initialState, action: PostActionTypes) => {
    switch (action.type) {
        case GET_POST: {
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        }
        case GET_POSTS: {
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
