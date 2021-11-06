import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { alertReducer } from "./alert";
import { profileReducer } from "./profile";
import { offerReducer } from "./offers";

export default combineReducers({
    authReducer,
    alertReducer,
    profileReducer,
    offerReducer
});
