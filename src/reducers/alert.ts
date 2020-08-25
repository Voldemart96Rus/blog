import {SET_ALERT, REMOVE_ALERT, IAlertState, AlertActionTypes} from '../types';

const initialState: IAlertState = {
    alerts: [],
};

export default (state = initialState, action: AlertActionTypes) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [action.payload, ...state.alerts],
            };
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(({id}) => id !== action.payload),
            };
        default:
            return state;
    }
};
