import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pastLogin.css";
import { Header } from "./header.jsx";
import { useTranslation } from "react-i18next";

/**
 * LoggedInApplicantView component is displayed when an applicant is logged in.
 * It provides options for the applicant to apply for a position or log out.
 * 
 * @component
 * @example
 * return (
 *   <LoggedInApplicantView />
 * )
 */
export const LoggedInApplicantView = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    /**
     * Handles the logout process by navigating the user to the login page.
     */
    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="applicant-container">
                <div className="applicant-box">
                    <h2 className="applicant-title">{t("applicantContainerTitle")}</h2>
                    <p className="applicant-text">
                        {t("applicantContainerText")} <br />
                    </p>
                    <div className="applicant-buttons">
                        <button className="apply-btn" onClick={() => navigate("/applicationForm")}>
                            {t("applicantApplyButton")}
                        </button>
                        <span className="applicant-or">{t("TXT_OR ")}</span>
                        <button className="logout-btn" onClick={() => navigate("/login")}>
                            {t("LogOut")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoggedInApplicantView;
