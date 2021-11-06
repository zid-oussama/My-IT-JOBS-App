import {
    GET_PROFILES_FAIL,
    GET_PROFILES_LOAD,
    GET_PROFILES_SUCCESS,
    GET_REPOS_FAIL,
    GET_REPOS_LOAD,
    GET_REPOS_SUCCESS,
    PROFILE_ADD_EDUCATION_FAIL,
    PROFILE_ADD_EDUCATION_LOAD,
    PROFILE_ADD_EDUCATION_SUCCESS,
    PROFILE_ADD_EXPERIENCE_FAIL,
    PROFILE_ADD_EXPERIENCE_LOAD,
    PROFILE_ADD_EXPERIENCE_SUCCESS,
    PROFILE_CLEAR,
    PROFILE_CREATE_FAIL,
    PROFILE_CREATE_LOAD,
    PROFILE_CREATE_SUCCESS,
    PROFILE_DELETE_EDUCATION_FAIL,
    PROFILE_DELETE_EDUCATION_LOAD,
    PROFILE_DELETE_EDUCATION_SUCCESS,
    PROFILE_DELETE_EXPERIENCE_FAIL,
    PROFILE_DELETE_EXPERIENCE_LOAD,
    PROFILE_DELETE_EXPERIENCE_SUCCESS,
    PROFILE_DELETE_FAIL,
    PROFILE_DELETE_LOAD,
    PROFILE_DELETE_SUCCESS,
    PROFILE_FAIL,
    PROFILE_LOAD,
    PROFILE_SUCCESS
} from "../constants/profile";

const initialState = {
    load: false,
    profile: null,
    showProfiles: [],
    repos: null
};

export const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_LOAD:
            return { ...state, load: true };
        case PROFILE_SUCCESS:
            return { ...state, load: false, profile: payload };
        case PROFILE_FAIL:
            return { ...state, load: false };
        case PROFILE_CLEAR:
            return (state = initialState);

        case PROFILE_CREATE_LOAD:
            return { ...state, load: true };
        case PROFILE_CREATE_SUCCESS:
            return { ...state, load: false, profile: payload };
        case PROFILE_CREATE_FAIL:
            return { ...state, load: false };

        case PROFILE_DELETE_LOAD:
            return { ...state, load: true };
        case PROFILE_DELETE_SUCCESS:
            return (state = initialState);
        case PROFILE_DELETE_FAIL:
            return { ...state, load: false };

        case PROFILE_ADD_EXPERIENCE_LOAD:
            return { ...state, load: true };
        case PROFILE_ADD_EXPERIENCE_SUCCESS:
            return { ...state, load: false, profile: payload };
        case PROFILE_ADD_EXPERIENCE_FAIL:
            return { ...state, load: false };

        case PROFILE_ADD_EDUCATION_LOAD:
            return { ...state, load: true };
        case PROFILE_ADD_EDUCATION_SUCCESS:
            return { ...state, load: false, profile: payload };
        case PROFILE_ADD_EDUCATION_FAIL:
            return { ...state, load: false };

        case PROFILE_DELETE_EXPERIENCE_LOAD:
            return { ...state, load: true };
        case PROFILE_DELETE_EXPERIENCE_SUCCESS:
            return { ...state, load: false, profile: payload };
        case PROFILE_DELETE_EXPERIENCE_FAIL:
            return { ...state, load: false };

        case PROFILE_DELETE_EDUCATION_LOAD:
            return { ...state, load: true };
        case PROFILE_DELETE_EDUCATION_SUCCESS:
            return { ...state, load: false, profile: payload };
        case PROFILE_DELETE_EDUCATION_FAIL:
            return { ...state, load: false };

        case GET_PROFILES_LOAD:
            return { ...state, load: true };
        case GET_PROFILES_SUCCESS:
            return { ...state, load: false, showProfiles: payload };
        case GET_PROFILES_FAIL:
            return { ...state, load: false };

        case GET_REPOS_LOAD:
            return { ...state, load: true };
        case GET_REPOS_SUCCESS:
            return { ...state, load: false, repos: payload };
        case GET_REPOS_FAIL:
            return { ...state, load: false };

        default:
            return state;
    }
};
