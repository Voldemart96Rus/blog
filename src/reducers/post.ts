import {SET_LOADING} from '../actions/types';

const initialState: any = {
    posts: [],
    post: null,
    loading: false,
    errors: [],
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
