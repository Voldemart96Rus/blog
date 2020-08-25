import {
    SET_ALERT,
    REMOVE_ALERT,
    SetAlertAction,
    RemoveAlertAction,
    IAlert,
} from '../types';

export const setAlert = (alert: IAlert): SetAlertAction => ({
    type: SET_ALERT,
    payload: alert,
});

export const removeAlert = (id: string): RemoveAlertAction => ({
    type: REMOVE_ALERT,
    payload: id,
});
