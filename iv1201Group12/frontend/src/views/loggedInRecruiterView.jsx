import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pastLogin.css"; // Ensure this file exists

const LoggedInRecruiterView = () => {
    const navigate = useNavigate();

    return (
        <div className="recruiter-container">
            <div className="recruiter-box">
                <h2 className="recruiter-title">Welcome dear recruiter!</h2>
                <p className="recruiter-text">
                    Let’s take care of some applications! Please press <br />
                    “List all applications” below.
                </p>
                <div className="recruiter-buttons">
                    <button className="list-btn" onClick={() => navigate("/applicationListView")}>
                        List all applications
                    </button>
                    <p className="recruiter-or">Or</p>
                    <button className="logout-btn" onClick={() => navigate("/logout")}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoggedInRecruiterView;