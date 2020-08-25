import {INITIAL_PAGINATION_STATE} from '../constants';
import {
    GET_USER,
    GET_USERS,
    USER_ERROR,
    SET_LOADING,
    CLEAN_USERS,
    DELETE_USER_ERROR,
    SET_USERS_PAGE,
    SET_USER_POSTS_AND_PAGE,
    IUserState,
    UserActionTypes,
} from '../types';

const initialState: IUserState = {
    users: [],
    page: 1,
    postsPage: 1,
    pagination: INITIAL_PAGINATION_STATE,
    postPagination: INITIAL_PAGINATION_STATE,
    user: null,
    errors: [],
    loading: false,
};

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                users: action.payload.users,
                pagination: action.payload.pagination,
                loading: false,
            };
        }
        case GET_USER: {
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        }
        case USER_ERROR: {
            return {
                ...state,
                errors: [action.payload, ...state.errors],
                loading: false,
            };
        }
        case SET_USERS_PAGE: {
            return {
                ...state,
                page: action.payload,
                loading: false,
            };
        }
        case SET_USER_POSTS_AND_PAGE: {
            return {
                ...state,
                postPage: action.payload.page,
                user: {...state.user, posts: action.payload.posts},
                loading: false,
            };
        }
        case CLEAN_USERS: {
            return {
                ...state,
                users: [],
                user: null,
                errors: [],
                loading: false,
            };
        }
        case DELETE_USER_ERROR: {
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
