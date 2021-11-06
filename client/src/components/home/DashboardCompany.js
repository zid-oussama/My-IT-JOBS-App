import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myCompany } from "../../js/actions/offers";
import { myCompanyOffers } from "../../js/actions/offers";
import CompanyOffers from "../offer/CompanyOffers";

const Dashboard = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.offerReducer.myCompany);
    const myOffers = useSelector((state) => state.offerReducer.myOffers);

    useEffect(() => {
        dispatch(myCompany());
        dispatch(myCompanyOffers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="dashboard">
            <section className="container">
                <h1 className="large text-primary">Dashboard Company</h1>{" "}
                <p className="lead">
                    <i className="fas fa-user hide-sm"> </i>
                    {"  "}
                    {company && <span style={{ textTransform: "capitalize" }}>{company.name}</span>}
                </p>
                {!myOffers && <p>You have not yet Created an offer , please create one.</p>}
                <div className="dash-buttons">
                    <Link to="/company_profile" className="btn btn-dark my-1">
                        Add Company Info
                    </Link>
                    <Link to="/create-offer" className="btn btn-dark my-1">
                        {!myOffers ? " Create First Offer" : "Add New Offer"}
                    </Link>
                </div>
                {myOffers && <CompanyOffers offers={myOffers} />}
            </section>
        </div>
    );
};

export default Dashboard;
