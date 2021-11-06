import React, { useEffect } from "react";
//import "./Normalize.css";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { useDispatch } from "react-redux";
import { tokenAuth } from "./js/actions/auth";
import DashboardCompany from "./components/home/DashboardCompany";
import DashboardUser from "./components/home/DashboardUser";
import PrivateRouteUser from "./components/routes/PrivateRouteUser";
import PrivateRouteCompany from "./components/routes/PrivateRouteCompany";
import PrivateRouteAuth from "./components/routes/PrivateRouteAuth";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import Profiles from "./components/profiles/Profiles";
import ProfileInfo from "./components/profiles/ProfileInfo";
import CreateOffer from "./components/offer/CreateOffer";
import AllOffers from "./components/offers/AllOffers";
import OfferCard from "./components/offers/OfferCard";
import CompanyProfile from "./components/offer/CompanyProfile";
import OfferJobSeekers from "./components/offer/OfferJobSeekers";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tokenAuth());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Router>
                <Navbar />
                <Route exact path="/" component={Landing} />

                <Alert />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/offers" component={AllOffers} />
                    <PrivateRouteUser exact path="/dashboard_user" component={DashboardUser} />
                    <PrivateRouteUser exact path="/create-profile" component={CreateProfile} />
                    <PrivateRouteUser exact path="/edit-profile" component={EditProfile} />
                    <PrivateRouteUser exact path="/add-experience" component={AddExperience} />
                    <PrivateRouteUser exact path="/add-education" component={AddEducation} />
                    <PrivateRouteCompany exact path="/dashboard_company" component={DashboardCompany} />
                    <PrivateRouteCompany exact path="/create-offer" component={CreateOffer} />
                    <PrivateRouteCompany exact path="/company_profile" component={CompanyProfile} />
                    <PrivateRouteCompany exact path="/dashboard_company/:offer_id" component={OfferJobSeekers} />
                    <PrivateRouteAuth exact path="/offer/:offer_id" component={OfferCard} />
                    <PrivateRouteAuth exact path="/profile/:id" component={ProfileInfo} />
                </Switch>
            </Router>
        </>
    );
};

export default App;
