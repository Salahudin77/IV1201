import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MakeApplicationPresenter } from "../presenters/makeApplicationPresenter";
import "../styles/makeApplicationView.css";
import Header from "./header.jsx";


const MakeApplicationView = () => {
    // Initialize state

    const handleLogout = () => {
        // Clear user data (e.g., from local storage)
        localStorage.removeItem("userToken");
        window.location.href = "/login"; // Redirect to login
    };

    const [applicationData, setApplicationData] = useState({
        experiences: {
            ticketSales: "",
            lotteries: "",
            rollerCoasterOperation: "",
        },
        availability: []
    });

    const navigate = useNavigate();

    // Use useRef to create the presenter once
    const presenterRef = React.useRef(null);
    if (presenterRef.current === null) {
        presenterRef.current = new MakeApplicationPresenter(setApplicationData);
    }

    const presenter = presenterRef.current;

    return (
        <>
        <Header onLogout={handleLogout}/>
        <div className="application-container">
            <div className="application-box">
                <h2 className="application-title">Apply for a position</h2>
                <p className="application-text">
                    Please provide your previous work experiences <br />
                    (If any) Answer in years, leave blank if none.
                </p>

                <div className="experience-section">
                    <div className="experience-item">
                        <label>Ticket sales</label>
                        <input
                            type="number"
                            name="ticketSales"
                            step="0.01"
                            value={applicationData.experiences.ticketSales}
                            onChange={(e) => presenter.handleExperienceChange("ticketSales", e.target.value)}
                        />
                    </div>
                    <div className="experience-item">
                        <label>Lotteries</label>
                        <input
                            type="number"
                            name="lotteries"
                            step="0.01"
                            value={applicationData.experiences.lotteries}
                            onChange={(e) => presenter.handleExperienceChange("lotteries", e.target.value)}
                        />
                    </div>
                    <div className="experience-item">
                        <label>Roller coaster operation</label>
                        <input
                            type="number"
                            name="rollerCoasterOperation"
                            step="0.01"
                            value={applicationData.experiences.rollerCoasterOperation}
                            onChange={(e) => presenter.handleExperienceChange("rollerCoasterOperation", e.target.value)}
                        />
                    </div>
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