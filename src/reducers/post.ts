import {
    GET_POST,
    GET_POSTS,
    SET_LOADING,
    CLEAN_POSTS,
    IPostState,
    PostActionTypes,
} from '../types';

const initialState: IPostState = {
    posts: [],
    pagination: {
        total: 0,
        pages: 0,
        limit: 20,
    },
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
                posts: action.payload.posts,
                pagination: action.payload.pagination,
                loading: false,
            };
        }
        case CLEAN_POSTS: {
            return {
                ...state,
                posts: [],
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
