import {
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    SET_LOADING,
    CLEAN_POSTS,
    DELETE_POST_ERROR,
    SET_POSTS_PAGE,
    SET_COMMENTS_AND_PAGE,
    IPostState,
    PostActionTypes,
} from '../types';
import {INITIAL_PAGINATION_STATE} from '../constants';

const initialState: IPostState = {
    posts: [],
    page: 1,
    commentsPage: 1,
    pagination: INITIAL_PAGINATION_STATE,
    commentPagination: INITIAL_PAGINATION_STATE,
    post: null,
    errors: [],
    loading: false,
};

export default (state = initialState, action: PostActionTypes) => {
    switch (action.type) {
        case GET_POSTS: {
            return {
                ...state,
                posts: action.payload.posts,
                pagination: action.payload.pagination,
                loading: false,
            };
        }
        case GET_POST: {
            return {
                ...state,
                ...action.payload,
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
        case SET_COMMENTS_AND_PAGE: {
            return {
                ...state,
                commentsPage: action.payload.page,
                post: {...state.post, posts: action.payload.comments},
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
