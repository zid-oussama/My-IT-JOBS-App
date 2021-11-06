import axios from "axios";
import {
    PROFILE_FAIL,
    PROFILE_LOAD,
    PROFILE_SUCCESS,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_LOAD,
    PROFILE_CREATE_FAIL,
    PROFILE_ADD_EXPERIENCE_LOAD,
    PROFILE_ADD_EXPERIENCE_FAIL,
    PROFILE_ADD_EDUCATION_LOAD,
    PROFILE_ADD_EXPERIENCE_SUCCESS,
    PROFILE_ADD_EDUCATION_SUCCESS,
    PROFILE_ADD_EDUCATION_FAIL,
    PROFILE_DELETE_EDUCATION_LOAD,
    PROFILE_DELETE_EDUCATION_SUCCESS,
    PROFILE_DELETE_EDUCATION_FAIL,
    PROFILE_DELETE_EXPERIENCE_LOAD,
    PROFILE_DELETE_EXPERIENCE_SUCCESS,
    PROFILE_DELETE_EXPERIENCE_FAIL,
    PROFILE_DELETE_LOAD,
    PROFILE_DELETE_SUCCESS,
    PROFILE_DELETE_FAIL,
    GET_PROFILES_LOAD,
    GET_PROFILES_SUCCESS,
    GET_PROFILES_FAIL,
    PROFILE_CLEAR
} from "../constants/profile";
import { setAlert } from "./alert";

//Get current use profile
export const getCurrentProfile = () => async (dispatch) => {
    dispatch({ type: PROFILE_LOAD });
    try {
        const profile = await axios.get("/api/profile/me");
        dispatch({ type: PROFILE_SUCCESS, payload: profile.data.res });
    } catch (error) {
        dispatch(setAlert([{ msg: error.response.data.msg }], "danger"));
        dispatch({ type: PROFILE_FAIL });
    }
};

//Get profile by id
export const getProfileById = (id) => async (dispatch) => {
    dispatch({ type: PROFILE_LOAD });
    try {
        const profile = await axios.get(`/api/profile/user/${id}`);
        console.log(profile);
        dispatch({ type: PROFILE_SUCCESS, payload: profile.data.res });
    } catch (error) {
        dispatch(setAlert(error.response.data, "danger"));
        dispatch({ type: PROFILE_FAIL });
    }
};

//clear profile
export const clearProfile = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_CLEAR });
    } catch (error) {
        console.dir(error);
    }
};

//Create or update profile
export const createProfile = (data, isEdit) => async (dispatch) => {
    dispatch({ type: PROFILE_CREATE_LOAD });
    try {
        const profile = await axios.post("/api/profile/me", data);
        dispatch({ type: PROFILE_CREATE_SUCCESS, payload: profile.data.res });
        isEdit
            ? dispatch(setAlert([{ msg: "Profile Edited Successfully" }], "success"))
            : dispatch(setAlert([{ msg: "Profile Created Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: PROFILE_CREATE_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Add experience to profile
export const addExperience = (data, history) => async (dispatch) => {
    dispatch({ type: PROFILE_ADD_EXPERIENCE_LOAD });
    try {
        const profile = await axios.put("/api/profile/experience", data);
        dispatch({ type: PROFILE_ADD_EXPERIENCE_SUCCESS, payload: profile.data.res });
        dispatch(setAlert([{ msg: "Experience Added Successfully" }], "success"));
        history.push("/dashboard_user");
    } catch (error) {
        dispatch({ type: PROFILE_ADD_EXPERIENCE_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Add Experience to profile
export const addEducation = (data, history) => async (dispatch) => {
    dispatch({ type: PROFILE_ADD_EDUCATION_LOAD });
    try {
        const profile = await axios.put("/api/profile/education", data);
        dispatch({ type: PROFILE_ADD_EDUCATION_SUCCESS, payload: profile.data.res });
        dispatch(setAlert([{ msg: "Education Added Successfully" }], "success"));
        history.push("/dashboard_user");
    } catch (error) {
        dispatch({ type: PROFILE_ADD_EDUCATION_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Delete Education
export const deleteEducation = (id, history) => async (dispatch) => {
    dispatch({ type: PROFILE_DELETE_EDUCATION_LOAD });
    try {
        const profile = await axios.delete(`/api/profile/education/${id}`);
        dispatch({ type: PROFILE_DELETE_EDUCATION_SUCCESS, payload: profile.data.res });
        dispatch(setAlert([{ msg: "Education Deleted Successfully" }], "success"));
        history.push("/dashboard_user");
    } catch (error) {
        dispatch({ type: PROFILE_DELETE_EDUCATION_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Delete experience
export const deleteExperience = (id, history) => async (dispatch) => {
    dispatch({ type: PROFILE_DELETE_EXPERIENCE_LOAD });
    try {
        const profile = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({ type: PROFILE_DELETE_EXPERIENCE_SUCCESS, payload: profile.data.res });
        dispatch(setAlert([{ msg: "Experience Deleted Successfully" }], "success"));
        history.push("/dashboard_user");
    } catch (error) {
        dispatch({ type: PROFILE_DELETE_EXPERIENCE_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Delete Profile
export const deleteProfile = () => async (dispatch) => {
    dispatch({ type: PROFILE_DELETE_LOAD });
    try {
        await axios.delete("/api/profile");
        dispatch({ type: PROFILE_DELETE_SUCCESS });
        dispatch(setAlert([{ msg: "Profile Deleted Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: PROFILE_DELETE_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//GET All Profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: GET_PROFILES_LOAD });
    try {
        const profiles = await axios.get("/api/profile/");
        dispatch({ type: GET_PROFILES_SUCCESS, payload: profiles.data.res });
        dispatch(setAlert([{ msg: "These Are Our Users Profiles" }], "success"));
    } catch (error) {
        dispatch({ type: GET_PROFILES_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};
