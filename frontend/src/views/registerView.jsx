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
    
      /*
            UserSource.createAccount(registerData)
            .then(() => console.log("Form submitted with data:", registerData))
            .catch((error) => console.error("Error creating account:", error));
        */

    // Define updateView function inside the component
    const updateView = (newMessages) => {
        setMessages(newMessages);

        // Optional: Clear notifications after 3 seconds
        setTimeout(() => {
            setMessages({ successMessage: null, errorMessage: null });
        }, 3000);
    };

    // Pass updateView to the Presenter
    const presenter = new RegisterPresenter(updateView);

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        presenter.handleRegister(registerData); // Calls presenter to handle registration
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
                <input type="text" name="personNumber" placeholder="Person Number" value={registerData.personNumber} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={registerData.email} onChange={handleChange} required />
                <input type="text" name="userName" placeholder="Username" value={registerData.userName} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleChange} required />

                <button type="submit">CREATE ACCOUNT</button>
            </form>

            {/* Show success or error notifications */}
            {messages.successMessage && <div className="success-message">{messages.successMessage}</div>}
            {messages.errorMessage && <div className="error-message">{messages.errorMessage}</div>}
        </div>
    );
};

export default RegisterView;
