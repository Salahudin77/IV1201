import React from "react";
import { useNavigate } from "react-router-dom";
import UserSource from "../userSource.js";
import recruiter from "../recruiterSource.js";



const DummyView = () => {
    const navigate = useNavigate();

    // Static form data
    const formData = {
        personId: 999,
        personNumber: 9998,
        firstName: "suhaib",
        lastName: "salah",
        password: "marvin",
        roleId: 2,
        userName: "abd",
        email: "salibaisASS@example.com"
    };

    // Handle Add button click
    const handleAddButtonClick = async () => {
        const app = await recruiter.listApplications();
        console.log(app);
    }

    return (
        <div className="home-container">
            <div className="home-box">
                <div className="home-buttons">
                    <button className="home-btn login-btn" onClick={handleAddButtonClick}>
                        ADD
                    </button>
                    <span className="home-or">or</span>
                </div>
            </div>
        </div>
    );
};

export default DummyView;
