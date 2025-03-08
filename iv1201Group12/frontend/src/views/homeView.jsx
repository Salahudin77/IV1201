import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import the CSS file
import Header from "./header.jsx";


const HomeView = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-box">
                <h1 className="home-title">👋 Welcome!</h1>
                <p className="home-text">Recruitment AB is taking applications for summer jobs!</p>

                <div className="home-buttons">
                    <button className="home-btn login-btn" onClick={() => navigate("/login")}>LOGIN</button>
                    <span className="home-or">or</span>
                    <button className="home-btn register-btn" onClick={() => navigate("/register")}>REGISTER</button>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
