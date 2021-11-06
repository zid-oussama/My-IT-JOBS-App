import axios from "axios";
import {
    ALL_OFFERS_FAIL,
    ALL_OFFERS_LOAD,
    ALL_OFFERS_SUCCESS,
    COMPANY_PROFILE_CREATE_FAIL,
    COMPANY_PROFILE_CREATE_LOAD,
    COMPANY_PROFILE_CREATE_SUCCESS,
    DELETE_OFFER_FAIL,
    DELETE_OFFER_LOAD,
    DELETE_OFFER_SUCCESS,
    GET_OFFER_BYID_FAIL,
    GET_OFFER_BYID_LOAD,
    GET_OFFER_BYID_SUCCESS,
    MYCOMPANY_FAIL,
    MYCOMPANY_LOAD,
    MYCOMPANY_SUCCESS,
    MY_OFFERS_CLEAR,
    MY_OFFERS_FAIL,
    MY_OFFERS_LOAD,
    MY_OFFERS_SUCCESS,
    OFFER_CREATE_FAIL,
    OFFER_CREATE_LOAD,
    OFFER_CREATE_SUCCESS,
    OFFRE_APPLY_FAIL,
    OFFRE_APPLY_LOAD,
    OFFRE_APPLY_SUCCESS
} from "../constants/offers";
import { setAlert } from "./alert";

//get my company info
export const myCompany = () => async (dispatch) => {
    dispatch({ type: MYCOMPANY_LOAD });
    try {
        const company = await axios.get("/api/company/me");

        dispatch({ type: MYCOMPANY_SUCCESS, payload: company.data.res });
    } catch (error) {
        dispatch({ type: MYCOMPANY_FAIL });
    }
};

//Create offer
export const createOffer = (data) => async (dispatch) => {
    dispatch({ type: OFFER_CREATE_LOAD });
    try {
        const offer = await axios.post("/api/offer/", data);
        dispatch({ type: OFFER_CREATE_SUCCESS, payload: offer.data.res });
        dispatch(setAlert([{ msg: "Offer Created Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: OFFER_CREATE_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//get all company offers
export const myCompanyOffers = () => async (dispatch) => {
    dispatch({ type: MY_OFFERS_LOAD });
    try {
        const myOffers = await axios.get("/api/offer/me");
        dispatch({ type: MY_OFFERS_SUCCESS, payload: myOffers.data.res });
        dispatch(setAlert([{ msg: "These are your offers" }], "success"));
    } catch (error) {
        dispatch({ type: MY_OFFERS_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//delete company offer
export const deleteCompanyOffer = (id, history) => async (dispatch) => {
    dispatch({ type: DELETE_OFFER_LOAD });
    try {
        const offers = await axios.delete(`api/offer/delete/${id}`);
        dispatch({ type: DELETE_OFFER_SUCCESS, payload: offers.data.res });
        history.push("/dashboard_company");
        dispatch(setAlert([{ msg: "Offer Deleted Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: DELETE_OFFER_FAIL });
        console.dir(error);
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//clear offer
export const clearOffer = () => async (dispatch) => {
    try {
        dispatch({ type: MY_OFFERS_CLEAR });
    } catch (error) {
        console.dir(error);
    }
};

//Get all offers
export const getAllOffers = () => async (dispatch) => {
    dispatch({ type: ALL_OFFERS_LOAD });
    try {
        const allOffers = await axios.get("/api/offer");
        dispatch({ type: ALL_OFFERS_SUCCESS, payload: allOffers.data.res });
        dispatch(setAlert([{ msg: "These are company offers " }], "success"));
    } catch (error) {
        console.dir(error);
        dispatch({ type: ALL_OFFERS_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Get  offer by id
export const getOfferById = (id, x) => async (dispatch) => {
    dispatch({ type: GET_OFFER_BYID_LOAD });
    try {
        const offer = await axios.get(`/api/offer/${id}`);
        dispatch({ type: GET_OFFER_BYID_SUCCESS, payload: offer.data.res });
        dispatch(setAlert([{ msg: "This is the complete offer." }], "success"));
        if (x) {
            dispatch(setAlert([{ msg: "This is all jobSeekers." }], "success"));
        }
    } catch (error) {
        console.dir(error);
        dispatch({ type: GET_OFFER_BYID_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Create or update company profile
export const createCompanyProfile = (data) => async (dispatch) => {
    dispatch({ type: COMPANY_PROFILE_CREATE_LOAD });
    try {
        const profile = await axios.put("/api/company/profile", data);
        dispatch({ type: COMPANY_PROFILE_CREATE_SUCCESS, payload: profile.data.res });
        dispatch(setAlert([{ msg: "Profile Created Successfully" }], "success"));
    } catch (error) {
        dispatch({ type: COMPANY_PROFILE_CREATE_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
    }
};

//Apply for offer
export const userApplyOffre = (data, history) => async (dispatch) => {
    dispatch({ type: OFFRE_APPLY_LOAD });
    try {
        const apply = await axios.post(`/api/offer/apply/${data}`);
        dispatch({ type: OFFRE_APPLY_SUCCESS });
        console.log(apply);
        dispatch(setAlert(apply.data, "success"));
    } catch (error) {
        dispatch({ type: OFFRE_APPLY_FAIL });
        dispatch(setAlert(error.response.data, "danger"));
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }
};
