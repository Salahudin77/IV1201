import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPresenter } from "../presenters/loginPresenter";
import "../styles/login.css";
import { useTranslation } from "react-i18next";

const LoginView = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const presenter = new LoginPresenter((update) => {
        setMessage(update.message);
        setIsError(update.isError); // Set error state
    });

    // Check if the user is already logged in (by checking the role in localStorage)
    useEffect(() => {
        const userRole = localStorage.getItem("userRole");

        if (userRole === "ROLE_APPLICANT") {
            navigate("/appLogin"); // Redirect if already logged in as an applicant
        } else if (userRole === "ROLE_RECRUITER") {
            navigate("/recLogin"); // Redirect if already logged in as a recruiter
        }
    }, [navigate]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setMessage(null); // Reset message when user types
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateInput();
        if (error) {
            setMessage(error);
            setIsError(true);
            return;
        }

        const loginResponse = await presenter.handleLogin(credentials);  // Assume this returns a response

        if (loginResponse.success) {
            // After a successful login, check the role stored in localStorage
            const userRole = localStorage.getItem("userRole");

            if (userRole === "ROLE_APPLICANT") {
                navigate("/appLogin");  // Redirect to applicant view
            } else if (userRole === "ROLE_RECRUITER") {
                navigate("/recLogin");  // Redirect to recruiter view
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
        <div className="container">
            <h2>Login</h2>

            {message && (
                <p className={isError ? "error-message" : "success-message"}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={credentials.username}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
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
