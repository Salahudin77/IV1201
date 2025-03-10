import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { RegisterPresenter } from "../presenters/registerPresenter";

const RegisterView = () => {
    const navigate = useNavigate();
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
        
        // First Name Validation
        if (!/^[a-zA-Z]{2,}$/.test(firstName)) {
            return "First name must contain only letters and be at least 2 characters long.";
        }

        // Last Name Validation
        if (!/^[a-zA-Z]{2,}$/.test(lastName)) {
            return "Last name must contain only letters and be at least 2 characters long.";
        }

        // Person Number Validation (Format: YYMMDD-NNNN)
        if (!/^\d{6}-\d{4}$/.test(personNumber)) {
            return "Person number must be in the format YYMMDD-NNNN (e.g., 950625-1234).";
        }

        // Email Validation
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return "Invalid email format.";
        }

        // Username Validation
        if (userName.length < 4 || userName.length > 20) {
            return "Username must be between 4 and 20 characters.";
        }

        // Password Validation (at least 6 characters)
        if (!/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(password)) {
            return "Password must be at least 6 characters long and include at least one letter and one number.";
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
        <div className="container">
            <p className="back-to-login" onClick={() => navigate("/login")}>
                Back to login
            </p>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First name" value={registerData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last name" value={registerData.lastName} onChange={handleChange} required />
                <input type="text" name="personNumber" placeholder="Person Number (YYMMDD-NNNN)" value={registerData.personNumber} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={registerData.email} onChange={handleChange} required />
                <input type="text" name="userName" placeholder="Username" value={registerData.userName} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleChange} required />
                <button type="submit">CREATE ACCOUNT</button>
            </form>
            {messages.successMessage && <div className="success-message">{messages.successMessage}</div>}
            {messages.errorMessage && <div className="error-message">{messages.errorMessage}</div>}
        </div>
    );
};

export default RegisterView;
