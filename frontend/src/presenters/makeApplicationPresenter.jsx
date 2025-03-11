import { MakeApplicationModel } from "../models/makeApplicationModel"; 

/**
 * Presenter for managing the application process.
 * This class interacts with the MakeApplicationModel to manage experience, availability,
 * competence selection, and submission, while updating the view accordingly.
 */
export class MakeApplicationPresenter {
    /**
     * Creates an instance of the MakeApplicationPresenter.
     * @param {Function} setApplicationData - The function to update the application data in the view.
     */
    constructor(setApplicationData) {
        this.model = new MakeApplicationModel();
        this.setApplicationData = setApplicationData;

        // Bind methods to this instance
        this.handleExperienceChange = this.handleExperienceChange.bind(this);
        this.addAvailabilityPeriod = this.addAvailabilityPeriod.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
        this.submitApplication = this.submitApplication.bind(this);
        this.toggleCompetence = this.toggleCompetence.bind(this);
    }

    /**
     * Handles experience change for a specific competence and updates the view.
     * @param {string} competenceId - The unique identifier of the competence.
     * @param {number} value - The value of experience to set for the competence.
     */
    handleExperienceChange(competenceId, value) {
        const result = this.model.setExperience(competenceId, value);
        if (result.success) {
            // Update the view with the entire application data
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        } else {
            alert(result.message);
        }
    }

    /**
     * Toggles the selection state of a competence and updates the view.
     * @param {string} competenceId - The unique identifier of the competence to toggle.
     */
    toggleCompetence(competenceId) {
        const result = this.model.toggleCompetence(competenceId);
        if (result.success) {
            // After toggling the competence, update the view with the updated application data
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        } else {
            alert(result.message);
        }
    }

    /**
     * Adds a new availability period and updates the view with the updated application data.
     */
    addAvailabilityPeriod() {
        const result = this.model.addAvailabilityPeriod();
        if (result) {
            // Update the view with the entire application data after adding availability
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        }
    }

    /**
     * Handles the change in availability dates for a specific period.
     * @param {number} index - The index of the availability period to update.
     * @param {string} field - The field to update ('from' or 'to').
     * @param {string} date - The new date value to set.
     */
    handleAvailabilityChange(index, field, date) {
        const result = this.model.setAvailability(index, field, date);
        if (result.success) {
            // Update the view with the entire application data after setting availability
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        } else {
            alert(result.message);
        }
    }

    /**
     * Submits the application and handles success or error response.
     * @async
     * @returns {Promise<void>} A promise indicating the result of the application submission.
     */
    async submitApplication() {
        const result = await this.model.submitApplication();
        console.log(result);
        
        if (result.success) {
            alert(result.message);
            // Here you would typically navigate to another page or reset the form
        } else {
            alert(result.message);
        }
    }
}
