import {
    GET_USER,
    GET_USERS,
    SET_LOADING,
    GET_PAGINATION_DATA,
    CLEAN_USERS,
} from '../types';
import {IUserState, UserActionTypes} from '../types';

const initialState: IUserState = {
    users: [],
    user: null,
    pagination: {
        total: 0,
        pages: 0,
    },
    loading: false,
};

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                users: action.payload,
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
        case CLEAN_USERS: {
            return {
                ...state,
                users: [],
                loading: false,
            };
        }
        case GET_PAGINATION_DATA: {
            return {
                ...state,
                pagination: action.payload,
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
