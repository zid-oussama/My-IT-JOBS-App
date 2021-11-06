import {
    AUTH_FAIL,
    AUTH_LOAD,
    AUTH_SUCCESS,
    DELETE_ACCOUNT_FAIL,
    DELETE_ACCOUNT_LOAD,
    DELETE_ACCOUNT_SUCCESS,
    LOGIN_FAIL,
    LOGIN_LOAD,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_LOAD,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOAD,
    REGISTER_SUCCESS
} from "../constants/auth";

const initialState = {
    load: false,
    isConnected: {},
    isUser: null,
    isAuth: "unothorized"
};
export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_LOAD:
            return { ...state, load: true };
        case AUTH_SUCCESS:
            return { ...state, isUser: payload.isUser, isConnected: payload.res, isAuth: true, load: false };
        case AUTH_FAIL:
            return { ...state, isAuth: false, load: false };

        case REGISTER_LOAD:
            return { ...state, load: true };
        case REGISTER_SUCCESS:
            return { ...state, load: false };
        case REGISTER_FAIL:
            return { ...state, load: false };

        case LOGIN_LOAD:
            return { ...state, load: true };
        case LOGIN_SUCCESS:
            return { ...state, load: false, isAuth: true, isConnected: payload.isConnected, isUser: payload.isUser };
        case LOGIN_FAIL:
            return { ...state, load: false };

        case LOGOUT_LOAD:
            return { ...state, load: true };
        case LOGOUT_SUCCESS:
            return (state = initialState);
        case LOGOUT_FAIL:
            return { ...state, load: false };

        case DELETE_ACCOUNT_LOAD:
            return { ...state, load: true };
        case DELETE_ACCOUNT_SUCCESS:
            return (state = initialState);
        case DELETE_ACCOUNT_FAIL:
            return { ...state, load: false };

        default:
            return state;
    }
};
