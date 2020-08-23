import {GET_USER, GET_USERS, SET_LOADING} from '../actions/types';

const initialState: any = {
    users: [],
    user: null,
    loading: false,
};

export default (state = initialState, action: any) => {
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
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
