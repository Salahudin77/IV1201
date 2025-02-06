import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPresenter } from "../presenters/loginPresenter";
import "../styles/login.css";

const LoginView = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const presenter = new LoginPresenter(({ errorMessage }) => {
        setErrorMessage(errorMessage);
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        presenter.handleLogin(credentials);
    };

    return (
        <div className="container">
            <h2>Login</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

                <button type="submit">LOGIN</button>
            </form>

            <p className="forgot-password">Forgot password?</p>

            {/* Navigate to Register Page */}
            <p className="signup-text">
                Need an account? <span className="signup-link" onClick={() => navigate("/register")}>SIGN UP</span>
            </p>
        </div>
    );
};

export default LoginView;
