import {Dispatch} from 'react';

import {SET_TOKEN, AuthActionTypes} from '../types';

export const setToken = (token: string) => (
    dispatch: Dispatch<AuthActionTypes>
) => dispatch({type: SET_TOKEN, payload: token});
