import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MakeApplicationPresenter } from "../presenters/makeApplicationPresenter";
import "../styles/makeApplicationView.css";
import Header from "./header.jsx";
import { useTranslation } from "react-i18next";

// List of competencies available for the application form
const competencies = [
    { id: 1, name: "competenceTicketSales" },
    { id: 2, name: "competenceLotteries" },
    { id: 3, name: "competenceRollerCoaster" }
];

/**
 * MakeApplicationView component provides a form for users to apply for a position,
 * where they can select competencies, add availability periods, and submit the application.
 * 
 * @component
 * @example
 * return (
 *   <MakeApplicationView />
 * )
 */
const MakeApplicationView = () => {
    const { t } = useTranslation();
    
    /**
     * Handles user logout by removing the token from localStorage and redirecting to the login page.
     */
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        window.location.href = "/login";
    };

    // State to manage application data: experiences, availability periods, and competencies selection
    const [applicationData, setApplicationData] = useState({
        experiences: [],
        availability: [],
        competencies: competencies.map(comp => ({ ...comp, selected: false }))
    });

    const navigate = useNavigate();
    
    // Reference to the presenter for handling business logic
    const presenterRef = React.useRef(null);
    if (presenterRef.current === null) {
        presenterRef.current = new MakeApplicationPresenter(setApplicationData);
    }
    const presenter = presenterRef.current;

    /**
     * Toggles the selection state of a competence.
     * 
     * @param {number} competenceId - The id of the competence to toggle.
     */
    const toggleCompetence = (competenceId) => {
        presenter.toggleCompetence(competenceId);
    };

    /**
     * Adds a new availability period to the application form.
     */
    const addAvailability = () => {
        presenter.addAvailabilityPeriod();
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="application-container">
                <div className="application-box">
                    <h2 className="application-title">{t("applicationTitle")}</h2>
                    <p className="application-text">{t("applicationTextCompetencies")}</p>

                    <div className="competence-section">
                        {competencies.map((competence) => (
                            <div key={competence.id} className="competence-item">
                                <label className="competence-label" htmlFor={`competence-${competence.id}`}>{t(competence.name)}</label>
                                <input
                                    type="checkbox"
                                    id={`competence-${competence.id}`}
                                    checked={applicationData.competencies.find(comp => comp.id === competence.id)?.selected || false}
                                    onChange={() => toggleCompetence(competence.id)}
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

                    <p className="application-text">{t("applicationTextAvailability")}</p>
                    <div className="availability-section">
                        {applicationData.availability.map((period, index) => (
                            <div key={index} className="date-picker-wrapper">
                                <DatePicker
                                    selected={period.from}
                                    onChange={(date) => presenter.handleAvailabilityChange(index, "from", date)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText={t("availabilityFromPlaceholder")}
                                    className="date-picker"
                                    popperPlacement="bottom-start"
                                    minDate={new Date()}
                                    maxDate={period.to}
                                />
                                <DatePicker
                                    selected={period.to}
                                    onChange={(date) => presenter.handleAvailabilityChange(index, "to", date)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText={t("availabilityToPlaceholder")}
                                    popperPlacement="bottom-start"
                                    className="date-picker"
                                    minDate={period.from || new Date()}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="add-btn" onClick={addAvailability}>{t("addAvailabilityButton")}</button>

                    <div className="application-buttons">
                        <button className="cancel-btn" onClick={() => navigate("/appLogin")}>
                            {t("cancelApplicationButton")}
                        </button>
                        <button className="submit-btn" onClick={presenter.submitApplication}>
                            {t("submitApplicationButton")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MakeApplicationView;
