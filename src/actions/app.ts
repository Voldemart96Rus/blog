import {SET_LOADING, SetLoadingAction} from '../types';

export const setLoading = (isLoading = true): SetLoadingAction => ({
    type: SET_LOADING,
    payload: isLoading,
});
