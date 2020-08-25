import {
    GET_USER,
    GET_USERS,
    USER_ERROR,
    SET_LOADING,
    CLEAN_USERS,
    SET_USERS_PAGE,
    IUserState,
    UserActionTypes,
} from '../types';

const initialState: IUserState = {
    users: [],
    user: null,
    page: 1,
    pagination: {
        total: 0,
        pages: 0,
        limit: 20,
    },
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
                user: action.payload,
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
        case CLEAN_USERS: {
            return {
                ...state,
                users: [],
                loading: false,
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
