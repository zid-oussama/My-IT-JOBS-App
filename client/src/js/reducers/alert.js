import { SET_ALERT, REMOVE_ALERT } from '../constants/alert';

let initialState = {
    alertMsg: [],
    alertType: null
};

export const alertReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ALERT:
            return { ...state, alertMsg: [...payload.msg], alertType: payload.alertType };
        case REMOVE_ALERT:
            return state = initialState
        default:
            return state;
    }
}

