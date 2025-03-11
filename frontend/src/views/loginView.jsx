import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginPresenter } from "../presenters/loginPresenter";
import "../styles/login.css";
import { useTranslation } from "react-i18next";
import Header from "./header";

/**
 * LoginView component renders a login form where users can enter their username and password.
 * Handles input validation, login submission, and redirects based on user roles.
 * 
 * @component
 * @example
 * return (
 *   <LoginView />
 * )
 */
const LoginView = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const presenterRef = useRef(null);

    useEffect(() => {
        /**
         * Initializes the LoginPresenter and checks the user's role stored in localStorage.
         * If the user is already logged in, it redirects them based on their role.
         * Also, handles language switching if the language query parameter is provided in the URL.
         */
        presenterRef.current = new LoginPresenter((update) => {
            setMessage(update.message);
            setIsError(update.isError);
        });

        const userRole = localStorage.getItem("userRole");
        if (userRole === "ROLE_APPLICANT") {
            navigate("/appLogin");
        } else if (userRole === "ROLE_RECRUITER") {
            navigate("/recLogin");
        }

        const searchParams = new URLSearchParams(location.search);
        const langParam = searchParams.get("lng");
        if (langParam && langParam !== i18n.language) {
            i18n.changeLanguage(langParam);
        }
    }, [navigate, location.search, i18n]);

    /**
     * Handles input field changes by updating the credentials state.
     * Resets the message state when the user starts typing.
     * 
     * @param {Event} e - The event triggered when the user types in an input field.
     */
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setMessage(null);
    };

    /**
     * Validates the user input for login.
     * Checks if the username is at least 4 characters long and if the password matches the required pattern.
     * 
     * @returns {string|null} - Returns an error message if validation fails, otherwise null.
     */
    const validateInput = () => {
        const { username, password } = credentials;

        if (username.length < 4) {
            return t("usernameError");
        }
        if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(password)) {
            return t("passwordError");
        }
        return null;
    };

    /**
     * Handles form submission, validates the input, and attempts login.
     * If login is successful, the user is redirected based on their role.
     * 
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateInput();
        if (error) {
            setMessage(error);
            setIsError(true);
            return;
        }

        const loginResponse = await presenterRef.current.handleLogin(credentials);
        if (loginResponse.success) {
            const userRole = localStorage.getItem("userRole");
            if (userRole === "ROLE_APPLICANT") {
                navigate("/appLogin");
            } else if (userRole === "ROLE_RECRUITER") {
                navigate("/recLogin");
            } else {
                setMessage("Unknown role");
                setIsError(true);
            }
        } else {
            setMessage(loginResponse.message || "Login failed");
            setIsError(true);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h2>{t("login")}</h2>

                {message && (
                    <p className={isError ? "error-message" : "success-message"}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder={t("username")}
                        onChange={handleChange}
                        value={credentials.username}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder={t("password")}
                        onChange={handleChange}
                        value={credentials.password}
                        required
                    />
                    <button className="login-button" type="submit" data-testid="login-button">login</button>
                </form>

                <p className="forgot-password">{t("FORGOT_PASSWORD")}</p>

                <p className="signup-text">
                    {t("needAccount")}{" "}
                    <span className="signup-link" onClick={() => navigate("/register")}>
                        {t("signUp")}
                    </span>
                </p>
            </div>
        </>
    );
};

export default LoginView;
