import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for DatePicker
import { MakeApplicationPresenter } from "../presenters/makeApplicationPresenter";
import "../styles/makeApplicationView.css";

const MakeApplicationView = () => {
    const navigate = useNavigate();
    const presenter = new MakeApplicationPresenter(navigate);

    const [applicationData, setApplicationData] = useState({
        ticketSales: "",
        lotteries: "",
        rollerCoasterOperation: "",
        fromDate: null,
        toDate: null
    });

    const handleChange = (e) => {
        setApplicationData({
            ...applicationData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date, field) => {
        setApplicationData({
            ...applicationData,
            [field]: date
        });
    };

    return (
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
                        <input type="number" name="ticketSales" value={applicationData.ticketSales} onChange={handleChange} />
                    </div>
                    <div className="experience-item">
                        <label>Lotteries</label>
                        <input type="number" name="lotteries" value={applicationData.lotteries} onChange={handleChange} />
                    </div>
                    <div className="experience-item">
                        <label>Roller coaster operation</label>
                        <input type="number" name="rollerCoasterOperation" value={applicationData.rollerCoasterOperation} onChange={handleChange} />
                    </div>
                </div>

                <p className="application-text">Please provide your availability periods.</p>

                <div className="availability-section">
                    <DatePicker
                        selected={applicationData.fromDate}
                        onChange={(date) => handleDateChange(date, "fromDate")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select From Date"
                        className="date-picker"
                    />
                    <DatePicker
                        selected={applicationData.toDate}
                        onChange={(date) => handleDateChange(date, "toDate")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select To Date"
                        className="date-picker"
                    />
                </div>

                <div className="application-buttons">
                    <button className="cancel-btn" onClick={() => navigate("/loggedInApplicantView")}>
                        Cancel Application
                    </button>
                    <button className="submit-btn" onClick={() => presenter.submitApplication(applicationData)}>
                        Hand in application
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakeApplicationView;
