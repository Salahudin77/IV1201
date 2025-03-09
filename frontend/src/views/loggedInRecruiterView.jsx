import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pastLogin.css"; // Ensure this file exists
import { Header } from "./header.jsx";

const LoggedInRecruiterView = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        localStorage.removeItem("authToken"); // Adjust based on your auth implementation

        // Redirect to login page
        navigate("/login");
    };


    return (
        <>
            <Header onLogout={handleLogout}/>
            <div className="recruiter-container">
                <div className="recruiter-box">
                    <h2 className="recruiter-title">Welcome dear recruiter!</h2>
                    <p className="recruiter-text">
                        Let’s take care of some applications! Please press <br />
                        “List all applications” below.
                    </p>
                    <div className="recruiter-buttons">
                        <button className="list-btn" onClick={() => navigate("/applicationList")}>
                            List all applications
                        </button>
                        <p className="recruiter-or">Or</p>
                        <button className="logout-btn" onClick={() => navigate("/logout")}>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoggedInRecruiterView;