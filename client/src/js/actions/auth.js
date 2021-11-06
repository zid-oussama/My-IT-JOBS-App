import axios from "axios";
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
import { MY_OFFERS_CLEAR } from "../constants/offers";
import { PROFILE_CLEAR } from "../constants/profile";
import { setAlert } from "./alert";

export const registerUser = (info, history) => async (dispatch) => {
    dispatch({ type: REGISTER_LOAD });
    try {
        const user = await axios.post("/api/users/register", info);
        dispatch({ type: REGISTER_SUCCESS });
        history.push("/login");
        console.log(user.data);
        dispatch(setAlert([user.data], "success"));
    } catch (error) {
        dispatch(setAlert(error.response.data, "danger"));
        dispatch({ type: REGISTER_FAIL });
    }
};
export const registerCompany = (info, history) => async (dispatch) => {
    dispatch({ type: REGISTER_LOAD });
    try {
        const company = await axios.post("/api/company/register", info);
        dispatch({ type: REGISTER_SUCCESS });
        history.push("/login");
        dispatch(setAlert([company.data], "success"));
    } catch (error) {
        dispatch(setAlert(error.response.data, "danger"));
        dispatch({ type: REGISTER_FAIL });
    }
};

export const loginUser = (info) => async (dispatch) => {
    dispatch({ type: LOGIN_LOAD });
    try {
        const user = await axios.post("api/users/login", info);
        dispatch({ type: LOGIN_SUCCESS, payload: { isConnected: user.data.res, isUser: true } });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

export const loginCompany = (info) => async (dispatch) => {
    dispatch({ type: LOGIN_LOAD });
    try {
        const company = await axios.post("api/company/login", info);
        dispatch({ type: LOGIN_SUCCESS, payload: { isConnected: company.data.res, isUser: false } });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

export const logout = (history) => async (dispatch) => {
    dispatch({ type: LOGOUT_LOAD });
    try {
        const msg = await axios.post("/api/logout");
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: MY_OFFERS_CLEAR });
        dispatch({ type: PROFILE_CLEAR });
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
        history.push("/login");

        dispatch(setAlert(msg.data, "success"));
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL });
    }
};

export const deleteAccount = (history) => async (dispatch) => {
    dispatch({ type: DELETE_ACCOUNT_LOAD });
    try {
        await axios.delete("/api/users/delete/");
        dispatch({ type: DELETE_ACCOUNT_SUCCESS });
        dispatch({ type: PROFILE_CLEAR });
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
        history.push("/register");
        dispatch(setAlert([{ msg: "Account Deleted Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: DELETE_ACCOUNT_FAIL });
    }
};

export const deleteAccountCompany = (history) => async (dispatch) => {
    dispatch({ type: DELETE_ACCOUNT_LOAD });
    try {
        await axios.delete("api/company/delete");
        dispatch({ type: DELETE_ACCOUNT_SUCCESS });
        dispatch({ type: MY_OFFERS_CLEAR });
        history.push("/register");
        dispatch(setAlert([{ msg: "Account Deleted Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: DELETE_ACCOUNT_FAIL });
    }
};

export const tokenAuth = () => async (dispatch) => {
    dispatch({ type: AUTH_LOAD });
    try {
        const auth = await axios.get("/api");
        dispatch({ type: AUTH_SUCCESS, payload: auth.data });
    } catch (error) {
        dispatch({ type: AUTH_FAIL });
    }
};
