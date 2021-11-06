import { SET_ALERT, REMOVE_ALERT } from "../constants/alert";

export const setAlert = (msg, alertType) => async (dispatch) => {
  dispatch({ type: REMOVE_ALERT });
  dispatch({ type: SET_ALERT, payload: { msg, alertType } });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT });
  }, 6000);
};

export const clearAlert = () => async (dispatch) => {
  dispatch({ type: REMOVE_ALERT });
};
