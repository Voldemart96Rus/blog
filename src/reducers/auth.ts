import {SET_TOKEN, AuthActionTypes, IAuthState} from '../types';

const initialState: IAuthState = {
    token: localStorage.getItem('token'),
};

export default (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                token: action.payload,
            };
        default:
            return state;
    }
};
