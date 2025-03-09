import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MakeApplicationPresenter } from "../presenters/makeApplicationPresenter";
import "../styles/makeApplicationView.css";
import Header from "./header.jsx";

const MakeApplicationView = () => {
    const handleLogout = () => {
        // Clear user data (e.g., from local storage)
        localStorage.removeItem("userToken");
        window.location.href = "/login"; // Redirect to login
    };

    const [applicationData, setApplicationData] = useState({
        experiences: [
            { competenceId: 1, yearsOfExperience: 0.0 },
            { competenceId: 2, yearsOfExperience: 0.0 },
            { competenceId: 3, yearsOfExperience: 0.0 }
        ],
        availability: []
    });

    const navigate = useNavigate();

    const presenterRef = React.useRef(null);
    if (presenterRef.current === null) {
        presenterRef.current = new MakeApplicationPresenter(setApplicationData);
    }

    const presenter = presenterRef.current;

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="application-container">
                <div className="application-box">
                    <h2 className="application-title">Apply for a position</h2>
                    <p className="application-text">
                        Please provide your previous work experiences <br />
                        (If any) Answer in years, leave blank if none.
                    </p>

                    <div className="experience-section">
                        {applicationData.experiences.map((exp, index) => (
                            <div key={exp.competenceId} className="experience-item">
                                <label>{exp.competenceId === 1 ? "Ticket sales" : exp.competenceId === 2 ? "Lotteries" : "Roller coaster operation"}</label>
                                <input
                                    type="number"
                                    name={`experience-${exp.competenceId}`}
                                    step="0.01"
                                    value={exp.yearsOfExperience}
                                    onChange={(e) => presenter.handleExperienceChange(exp.competenceId, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <p className="application-text">Please provide your availability periods.</p>

                    <div className="availability-section">
                        {applicationData.availability.map((period, index) => (
                            <div key={index} className="date-picker-wrapper">
                                <DatePicker
                                    selected={period.from}
                                    onChange={(date) => presenter.handleAvailabilityChange(index, "from", date)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select From Date"
                                    className="date-picker"
                                    popperPlacement="bottom-start"
                                    minDate={new Date()}
                                    maxDate={period.to}
                                />

                                <DatePicker
                                    selected={period.to}
                                    onChange={(date) => presenter.handleAvailabilityChange(index, "to", date)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select To Date"
                                    popperPlacement="bottom-start"
                                    className="date-picker"
                                    minDate={period.from || new Date()}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="add-btn" onClick={presenter.addAvailabilityPeriod}>
                        + Add Availability
                    </button>

                    <div className="application-buttons">
                        <button className="cancel-btn" onClick={() => navigate("/appLogin")}>
                            Cancel Application
                        </button>
                        <button className="submit-btn" onClick={presenter.submitApplication}>
                            Hand in application
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MakeApplicationView;
