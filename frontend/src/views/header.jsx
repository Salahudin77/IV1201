import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { LoginPresenter } from "../presenters/loginPresenter";

export const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const presenterRef = useRef(null);

    const userRole = localStorage.getItem("userRole"); // Get user role from storage

    useEffect(() => {
        // Initialize the presenter only once when the component mounts
        presenterRef.current = new LoginPresenter((update) => {
            setMessage(update.message);
            setIsError(update.isError); // Set error state
        });
    }, []); // Empty dependency array ensures this runs only once

    const handleHomeClick = () => {
        if (userRole === "ROLE_RECRUITER") {
            navigate("/recLogin"); // Redirect recruiters to their dashboard
        } else {
            navigate("/appLogin"); // Redirect applicants to their dashboard
        }
    };

    const handleLogoutClick = async () => {
        // Get the presenter instance from useRef
        const presenter = presenterRef.current;

        // Call handleLogout method from presenter
        const response = await presenter.handleLogout();

        if (response.success) {
            // Optionally, you can clear the localStorage and navigate the user after logout
            localStorage.removeItem("userRole");
            window.location.href = "/home";
            
           
        }
        
    };

    // Only update the component if the userRole actually changes
    useEffect(() => {
        // Check the user role here, and prevent unnecessary re-renders
        if (userRole !== null) {
            // Handle any necessary logic for setting the state based on the role
            // If you don't need to update the component, don't call `setState`
        }
    }, [userRole]); // Dependencies ensure the effect is only triggered when `userRole` changes

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
                            className="header-button logout-button"
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <div className="header-spacer"></div>
        </>
    );
};

export default Header;
