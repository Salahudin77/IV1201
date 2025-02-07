import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const RegisterView = () => {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="container">
            <p className="back-to-login" onClick={() => navigate("/login")}>Back to login</p>

            <h2>Register</h2>

            <form>
                <input type="text" placeholder="First name" required />
                <input type="text" placeholder="Last name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="text" placeholder="Person Number" required />
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />

                <button type="submit">CREATE ACCOUNT</button>
            </form>
        </div>
    );
};

export default RegisterView;
