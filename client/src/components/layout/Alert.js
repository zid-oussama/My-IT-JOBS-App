import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
    const alerts = useSelector((state) => state.alertReducer.alertMsg);
    const alertType = useSelector((state) => state.alertReducer.alertType);

    return (
        <div className="alert">
            {alerts.map((alert, i) => (
                <div key={i} className={`myalert alert-${alertType}`}>
                    <h5>{alert.msg}</h5>
                    {alertType === "danger" ? (
                        <i className="fas fa-exclamation-triangle"></i>
                    ) : (
                        <i className="fas fa-check-circle"></i>
                    )}
                </div>
            ))}
            {/* {alerts.length !== 0 && (alertType !== 'success') && <button className='btn btn-danger text-center'>clear</button>} */}
        </div>
    );
};

export default Alert;
