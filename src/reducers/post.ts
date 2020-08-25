import {
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    SET_LOADING,
    CLEAN_POSTS,
    DELETE_POST_ERROR,
    SET_POSTS_PAGE,
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
    page: 1,
    post: null,
    errors: [],
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
        case POST_ERROR: {
            return {
                ...state,
                errors: [action.payload, ...state.errors],
                loading: false,
            };
        }
        case SET_POSTS_PAGE: {
            return {
                ...state,
                page: action.payload,
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
        case DELETE_POST_ERROR: {
            return {
                ...state,
                errors: state.errors.filter(({id}) => id !== action.payload),
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
