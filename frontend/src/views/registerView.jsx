import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { RegisterPresenter } from "../presenters/registerPresenter";
import { useTranslation } from "react-i18next";
import Header from "./header";


const RegisterView = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [registerData, setRegisterData] = useState({
        personNumber: "",
        firstName: "",
        lastName: "",
        password: "",
        userName: "",
        roleId: 2,
        email: "",
    });

    const [messages, setMessages] = useState({
        successMessage: null,
        errorMessage: null,
    });

    const updateView = (newMessages) => {
        setMessages(newMessages);
        setTimeout(() => {
            setMessages({ successMessage: null, errorMessage: null });
        }, 3000);
    };

    const presenter = new RegisterPresenter(updateView);

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateInput();
        if (error) {
            setMessages({ successMessage: null, errorMessage: error });
            return;
        }
        await presenter.handleRegister(registerData);
        window.location.reload();
        window.location.href = "/recLogin";
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
                {messages.successMessage && <div className="success-message">{messages.successMessage}</div>}
                {messages.errorMessage && <div className="error-message">{messages.errorMessage}</div>}
            </div>
        </>
    );
};

export default RegisterView;
