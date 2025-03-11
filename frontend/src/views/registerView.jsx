import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { RegisterPresenter } from "../presenters/registerPresenter";
import { useTranslation } from "react-i18next";
import Header from "./header";

/**
 * RegisterView component that renders a user registration form.
 * Handles form state, input validation, and form submission.
 *
 * @component
 * @example
 * return (
 *   <RegisterView />
 * )
 */
const RegisterView = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // State to hold registration form data
    const [registerData, setRegisterData] = useState({
        personNumber: "",
        firstName: "",
        lastName: "",
        password: "",
        userName: "",
        roleId: 2,
        email: "",
    });

    // State to hold success and error messages
    const [messages, setMessages] = useState({
        successMessage: null,
        errorMessage: null,
    });

    /**
     * Updates the success or error messages.
     * Clears error message after 3 seconds.
     *
     * @param {Object} newMessages - New message data containing success and error messages.
     */
    const updateView = (newMessages) => {
        setMessages(newMessages);
        if (newMessages.errorMessage) {
            setTimeout(() => {
                setMessages((prevMessages) => ({ ...prevMessages, errorMessage: null }));
            }, 3000);
        }
    };

    // Presenter instance to handle registration logic
    const presenter = new RegisterPresenter(updateView);

    /**
     * Handles input changes in the form and updates the state accordingly.
     *
     * @param {Event} e - The event triggered by the form input change.
     */
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    /**
     * Validates the input data for the registration form.
     * Checks for valid first name, last name, person number, email, user name, and password.
     *
     * @returns {string|null} - Error message if any validation fails, otherwise null.
     */
    const validateInput = () => {
        const { personNumber, firstName, lastName, password, userName, email } = registerData;

        if (!/^[a-zA-Z]{2,}$/.test(firstName)) {
            return t("firstNameError");
        }
        if (!/^[a-zA-Z]{2,}$/.test(lastName)) {
            return t("lastNameError");
        }
        if (!/^\d{6}-\d{4}$/.test(personNumber)) {
            return t("personNumberError");
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return t("invalidEmail");
        }
        if (userName.length < 4 || userName.length > 20) {
            return t("usernameError");
        }
        if (!/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(password)) {
            return t("passwordError");
        }
        return null;
    };

    /**
     * Handles the form submission. Validates the input data and submits the registration request.
     * If successful, it reloads the page and navigates to the login page after a 2-second delay.
     *
     * @param {Event} e - The event triggered by the form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateInput();
        if (error) {
            setMessages({ successMessage: null, errorMessage: error });
            return;
        }

        const response = await presenter.handleRegister(registerData);

        if (response.success) {
            // Introduce a delay of 2 seconds (2000ms) before navigating and reloading
            setTimeout(() => {
                window.location.reload();
                window.location.href = "/recLogin";
            }, 2000); // 2000ms = 2 seconds delay
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <p className="back-to-login" onClick={() => navigate("/login")}>
                    {t("backToLogin")}
                </p>
                <h2>{t("register")}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder={t("fN")}
                        value={registerData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder={t("lN")}
                        value={registerData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="personNumber"
                        placeholder={t("pN")}
                        value={registerData.personNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t("email")}
                        value={registerData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="userName"
                        placeholder={t("username")}
                        value={registerData.userName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder={t("password")}
                        value={registerData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{t("createAccount")}</button>
                </form>
                {messages.errorMessage && (
                    <p className="error-message" style={{ color: "red" }}>{messages.errorMessage}</p>
                )}
                {messages.successMessage && (
                    <p className="success-message">{messages.successMessage}</p>
                )}
            </div>
        </>
    );
};

export default RegisterView;
