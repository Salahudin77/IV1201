import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pastLogin.css";
import { Header } from "./header.jsx";
import { useTranslation } from "react-i18next";

export const LoggedInApplicantView = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        
        navigate("/login");
    };

    return (
        <>
        <Header onLogout={handleLogout}/>
        <div className="applicant-container">
            <div className="applicant-box">
                <h2 className="applicant-title">{t("applicantContainerTitle")}</h2>
                <p className="applicant-text">
                    {t("applicantContainerText")} <br />
                </p>
                <div className="applicant-buttons">
                    <button className="apply-btn" onClick={() => navigate("/applicationForm")}>{t("applicantApplyButton")}</button>
                    <span className="applicant-or">{t("TXT_OR ")}</span>
                    <button className="logout-btn" onClick={() => navigate("/login")}>{t("LogOut")}</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default LoggedInApplicantView;
