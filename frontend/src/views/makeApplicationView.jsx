// Inside MakeApplicationView component

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MakeApplicationPresenter } from "../presenters/makeApplicationPresenter";
import "../styles/makeApplicationView.css";
import Header from "./header.jsx";

const competencies = [
    { id: 1, name: "Ticket sales" },
    { id: 2, name: "Lotteries" },
    { id: 3, name: "Roller coaster operation" }
];

const MakeApplicationView = () => {
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        window.location.href = "/login";
    };

    const [applicationData, setApplicationData] = useState({
        experiences: [],
        availability: [],
        competencies: competencies.map(comp => ({ ...comp, selected: false })) // Initializing competencies with a 'selected' state
    });

    const navigate = useNavigate();

    const presenterRef = React.useRef(null);
    if (presenterRef.current === null) {
        presenterRef.current = new MakeApplicationPresenter(setApplicationData);
    }

    const presenter = presenterRef.current;

    const toggleCompetence = (competenceId) => {
        presenter.toggleCompetence(competenceId);
    };

    const addAvailability = () => {
        presenter.addAvailabilityPeriod();
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="application-container">
                <div className="application-box">
                    <h2 className="application-title">Apply for a position</h2>
                    <p className="application-text">
                        Please select your competencies and provide your years of experience.
                    </p>

                    <div className="competence-section">
                        {competencies.map((competence) => (
                            <div key={competence.id} className="competence-item">
                                <label className="competence-label" htmlFor={`competence-${competence.id}`}>{competence.name}</label>
                                <input
                                    type="checkbox"
                                    id={`competence-${competence.id}`}
                                    checked={applicationData.competencies.find(comp => comp.id === competence.id)?.selected || false}
                                    onChange={() => toggleCompetence(competence.id)} // Issue could arise here if the ID is not consistent
                                />
                                {applicationData.competencies.find(comp => comp.id === competence.id)?.selected && (
                                    <input
                                        type="number"
                                        className="competence-input"
                                        name={`experience-${competence.id}`}
                                        step="0.01"
                                        onChange={(e) => presenter.handleExperienceChange(competence.id, e.target.value)}
                                    />
                                )}
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
                    <button className="add-btn" onClick={addAvailability}>+ Add Availability</button>

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
