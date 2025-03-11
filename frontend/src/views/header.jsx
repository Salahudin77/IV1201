import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/header.css";
import { LoginPresenter } from "../presenters/loginPresenter";
import i18next from "i18next";

/**
 * Header component displayed at the top of the application.
 * It provides navigation options, language toggle, and login/logout functionality.
 *
 * @component
 * @example
 * return (
 *   <Header onLogout={handleLogout} />
 * )
 */
export const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const presenterRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("en");

    const userRole = localStorage.getItem("userRole"); // Get user role from storage

    useEffect(() => {
        // Initialize the presenter only once when the component mounts
        presenterRef.current = new LoginPresenter((update) => {
            setMessage(update.message);
            setIsError(update.isError); // Set error state
        });

        // Check if user is logged in
        setIsLoggedIn(userRole !== null);

        // Set initial language based on URL
        const searchParams = new URLSearchParams(location.search);
        const langParam = searchParams.get("lng");
        if (langParam) {
            setCurrentLanguage(langParam);
            i18next.changeLanguage(langParam); // Change language using i18next
        }
    }, [userRole, location.search]); // Run when userRole or URL params change

    /**
     * Handles the click on the "Home" button. Redirects users to their respective dashboards 
     * or to the home page if not logged in.
     */
    const handleHomeClick = () => {
        if (userRole === "ROLE_RECRUITER") {
            navigate("/recLogin"); // Redirect recruiters to their dashboard
        } else if (userRole === "ROLE_APPLICANT") {
            navigate("/appLogin"); // Redirect applicants to their dashboard
        } else {
            navigate("/home"); // Redirect to home page when not logged in
        }
    };

    /**
     * Handles the click on the "Login/Logout" button. If the user is logged in, it logs them out;
     * otherwise, it redirects them to the login page.
     */
    const handleAuthClick = async () => {
        if (isLoggedIn) {
            // Handle logout
            const presenter = presenterRef.current;
            const response = await presenter.handleLogout();

            if (true) {
                localStorage.removeItem("userRole");
                setIsLoggedIn(false);
                window.location.href = "/home";
            }
        } else {
            // Handle login - redirect to login page
            navigate("/login");
        }
    };

    /**
     * Toggles the application language between English and Swedish.
     * Updates the language in i18next and modifies the URL search parameter.
     */
    const toggleLanguage = () => {
        // Get current path and search params
        const currentPath = location.pathname;
        const searchParams = new URLSearchParams(location.search);

        // Toggle language
        const newLanguage = currentLanguage === "en" ? "sv" : "en";
        setCurrentLanguage(newLanguage);

        // Update i18n language
        i18next.changeLanguage(newLanguage);

        // Update URL search parameter
        searchParams.set("lng", newLanguage);

        // Navigate to same path with updated language parameter
        navigate(`${currentPath}?${searchParams.toString()}`);
    };

    return (
        <>
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">😁 Recruitment AB</h1>
                    <div className="header-buttons">
                        <button
                            className="header-button home-button"
                            onClick={handleHomeClick}
                        >
                            Home
                        </button>

                        <button
                            className="header-button language-button"
                            onClick={toggleLanguage}
                        >
                            {currentLanguage === "en" ? "Svenska" : "English"}
                        </button>

                        <button
                            className="header-button auth-button"
                            onClick={handleAuthClick}
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </div>
                </div>
            </header>
            <div className="header-spacer"></div>
        </>
    );
};

export default Header;
