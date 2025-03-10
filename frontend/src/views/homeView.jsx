import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import the CSS file
import { Header } from "./header.jsx";
import { useTranslation } from "react-i18next";

const HomeView = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        
        navigate("/login");
    };

    return (
    <>
        <Header onLogout={handleLogout} />
        <div className="home-container">
            <div className="home-box">
                <h1 className="home-title">{t("homeTitle")}</h1>
                <p className="home-text">{t("homeText")}</p>

                <div className="home-buttons">
                    <button className="home-btn login-btn" onClick={() => navigate("/login")}>{t("login")}</button>
                    <span className="home-or">{t("TXT_OR ")}</span>
                    <button className="home-btn register-btn" onClick={() => navigate("/register")}>{t("Register").toUpperCase()}</button>
                </div>
            </div>
        </div>
    </>
    );
};

export default HomeView;
