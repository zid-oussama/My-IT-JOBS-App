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
    OFFRE_APPLY_LOAD,
    OFFRE_APPLY_SUCCESS
} from "../constants/offers";

const initialState = {
    load: false,
    myCompany: null,
    showOffers: [],
    myOffers: null,
    offer: null
};

export const offerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MYCOMPANY_LOAD:
            return { ...state, load: true };
        case MYCOMPANY_SUCCESS:
            return { ...state, load: false, myCompany: payload };
        case MYCOMPANY_FAIL:
            return { ...state, load: false };

        case MY_OFFERS_LOAD:
            return { ...state, load: true };
        case MY_OFFERS_SUCCESS:
            return { ...state, load: false, myOffers: payload };
        case MY_OFFERS_FAIL:
            return { ...state, load: false };
        case MY_OFFERS_CLEAR:
            return (state = initialState);

        case DELETE_OFFER_LOAD:
            return { ...state, load: true };
        case DELETE_OFFER_SUCCESS:
            return { ...state, load: false, myOffers: payload };
        case DELETE_OFFER_FAIL:
            return { ...state, load: false };

        case ALL_OFFERS_LOAD:
            return { ...state, load: true };
        case ALL_OFFERS_SUCCESS:
            return { ...state, load: false, showOffers: payload };
        case ALL_OFFERS_FAIL:
            return { ...state, load: false };

        case GET_OFFER_BYID_LOAD:
            return { ...state, load: true };
        case GET_OFFER_BYID_SUCCESS:
            return { ...state, load: false, offer: payload };
        case GET_OFFER_BYID_FAIL:
            return { ...state, load: false };

        case COMPANY_PROFILE_CREATE_LOAD:
            return { ...state, load: true };
        case COMPANY_PROFILE_CREATE_SUCCESS:
            return { ...state, load: false };
        case COMPANY_PROFILE_CREATE_FAIL:
            return { ...state, load: false };

        case OFFRE_APPLY_LOAD:
            return { ...state, load: true };
        case OFFRE_APPLY_SUCCESS:
            return { ...state, load: false };
        case OFFER_CREATE_FAIL:
            return { ...state, load: false };
        default:
            return state;
    }
};
