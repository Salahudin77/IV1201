import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPresenter } from "../presenters/loginPresenter";
import "../styles/login.css";
import { useTranslation } from "react-i18next";

const LoginView = () => {
    const { t } = useTranslation();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const presenter = new LoginPresenter((error) => {
        setErrorMessage(error);
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const validateInput = () => {
        const { username, password } = credentials;
        
        if (username.length < 4) {
            return "Username must be at least 4 characters long.";
        }
        if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(password)) {
            return "Password must be at least 8 characters long and include at least one letter and one number.";
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateInput();
        if (error) {
            setErrorMessage(error);
            return;
        }
        presenter.handleLogin(credentials);
    };

    return (
        <div className="container">
            <h2>Login</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

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

                <button type="submit">LOGIN</button>
            </form>

            <p className="forgot-password">Forgot password?</p>

            <p className="signup-text">
                Need an account? <span className="signup-link" onClick={() => navigate("/register")}>SIGN UP</span>
            </p>
        </div>
    );
};

export default LoginView;
