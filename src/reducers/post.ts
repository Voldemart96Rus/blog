import {SET_LOADING, GET_POSTS} from '../actions/types';

const initialState: any = {
    posts: [],
    post: null,
    loading: false,
    errors: [],
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_POSTS: {
            console.info(action);
            return {
                ...state,
                posts: action.payload,
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
