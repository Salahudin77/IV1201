import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pastLogin.css"; // Ensure this file exists
import { Header } from "./header.jsx";
import { useTranslation } from "react-i18next";

/**
 * LoggedInRecruiterView component is displayed when a recruiter is logged in.
 * It provides options for the recruiter to view applications or log out.
 * 
 * @component
 * @example
 * return (
 *   <LoggedInRecruiterView />
 * )
 */
const LoggedInRecruiterView = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    /**
     * Handles the logout process by clearing any authentication tokens or session data
     * and then navigating the user to the login page.
     */
    const handleLogout = () => {
        // Clear any authentication tokens or session data
        // Add logic to clear session data or authentication tokens if necessary

        // Redirect to login page
        navigate("/login");
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="recruiter-container">
                <div className="recruiter-box">
                    <h2 className="recruiter-title">{t("MSG_WELCOME_RECRUITER")}</h2>
                    <p className="recruiter-text">
                        {t("MSG_PROMPT_RECRUITER")}
                    </p>
                    <div className="recruiter-buttons">
                        <button className="list-btn" onClick={() => navigate("/applicationList")}>
                            {t("BTN_LIST_APPLICATIONS")}
                        </button>
                        <p className="recruiter-or">{t("TXT_OR ")}</p>
                        <button className="logout-btn" onClick={() => navigate("/logout")}> 
                            {t("LogOut")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoggedInRecruiterView;
