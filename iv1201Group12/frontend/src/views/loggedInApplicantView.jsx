import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pastLogin.css";

export const LoggedInApplicantView = () => {
    const navigate = useNavigate();

    return (
        <div className="applicant-container">
            <div className="applicant-box">
                <h2 className="applicant-title">Welcome dear applicant!</h2>
                <p className="applicant-text">
                    Do you feel ready to apply for your new summer job? <br />
                    Please press “apply” below.
                </p>
                <div className="applicant-buttons">
                    <button className="apply-btn" onClick={() => navigate("/makeApplicationView")}>Apply</button>
                    <span className="applicant-or">Or</span>
                    <button className="logout-btn" onClick={() => navigate("/login")}>Log out</button>
                </div>
            </div>
        </div>
    );
};

export default LoggedInApplicantView;