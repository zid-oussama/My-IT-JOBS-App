import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { setAlert } from "../../js/actions/alert";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const isUser = useSelector((state) => state.authReducer.isUser);
    if (isAuth === "unothorized") {
        return <Spinner></Spinner>;
    }
    if (isAuth && !isUser) {
        return <Route component={Component} {...rest} />;
    }
    dispatch(setAlert([{ msg: "You need to log in" }], "danger"));
    return <Redirect to="/login" />;
};

export default PrivateRoute;
