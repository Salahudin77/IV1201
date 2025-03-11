import applySource from "../applySource";

/**
 * MakeApplicationModel class responsible for managing the application process,
 * including competencies, availability, and submission.
 */
export class MakeApplicationModel {
    constructor() {
        /**
         * Initial application data containing competencies and availability.
         * @type {Object}
         * @property {Array<Object>} competencies - List of competencies with experience and selection state.
         * @property {Array<Object>} availability - List of availability periods.
         */
        this.applicationData = {
            competencies: [
                { id: 1, name: "Ticket sales", selected: false, yearsOfExperience: 0.0 },
                { id: 2, name: "Lotteries", selected: false, yearsOfExperience: 0.0 },
                { id: 3, name: "Roller coaster operation", selected: false, yearsOfExperience: 0.0 }
            ],
            availability: [] // Store availability periods
        };
    }

    /**
     * Set experience for a specific competence.
     * 
     * @param {number} competenceId - The ID of the competence to update.
     * @param {string|number} value - The number of years of experience to set.
     * @returns {Object} - A response object indicating success or failure.
     */
    setExperience(competenceId, value) {
        console.log(this.applicationData);
        const numericValue = parseFloat(value);
        if (numericValue < 0) {
            return { success: false, message: "Invalid input: Must be a valid non-negative number." };
        }
        // Update the corresponding experience based on competenceId
        const experience = this.applicationData.competencies.find(exp => exp.id === competenceId);
        if (experience) {
            experience.yearsOfExperience = numericValue;
        }
        return { success: true, value: numericValue };
    }

    /**
     * Toggle the competence selected state (select or deselect).
     * 
     * @param {number} competenceId - The ID of the competence to toggle.
     * @returns {Object} - A response object indicating success.
     */
    toggleCompetence(competenceId) {
        const competence = this.applicationData.competencies.find(comp => comp.id === competenceId);
        if (competence) {
            competence.selected = !competence.selected;
        }
        return { success: true };
    }

    /**
     * Add a new availability period to the application.
     * 
     * @returns {Array<Object>} - A copy of the updated availability list.
     */
    addAvailabilityPeriod() {
        const newAvailability = { from: null, to: null };
        this.applicationData.availability.push(newAvailability);
        return [...this.applicationData.availability];
    }

    /**
     * Format a date to the 'YYYY-MM-DD' format.
     * 
     * @param {string|Date} date - The date to format.
     * @returns {string|null} - The formatted date string, or null if no date is provided.
     */
    formatDate(date) {
        if (date) {
            return new Date(date).toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
        }
        return null; // Return null if no date is provided
    }

    /**
     * Set availability for a specific period (either 'from' or 'to' field).
     * 
     * @param {number} index - The index of the availability period to update.
     * @param {string} field - The field to update ('from' or 'to').
     * @param {string|Date} date - The date to set for the specified field.
     * @returns {Object} - A response object indicating success or failure with the updated availability.
     */
    setAvailability(index, field, date) {
        const updatedAvailability = this.applicationData.availability.map(period => ({ ...period }));

        // Ensure the period exists
        if (!updatedAvailability[index]) {
            updatedAvailability[index] = { from: null, to: null };
        }

        // Format the date before updating
        const formattedDate = this.formatDate(date);

        const updatedPeriod = {
            from: updatedAvailability[index].from,
            to: updatedAvailability[index].to,
            [field]: formattedDate // Update only the specific field with formatted date
        };

        // Validation: Ensure 'from' is before 'to'
        if (updatedPeriod.from && updatedPeriod.to && updatedPeriod.from > updatedPeriod.to) {
            return { success: false, message: "'From' date must be before 'To' date." };
        }

        updatedAvailability[index] = updatedPeriod;

        // Update the model's data with our validated copy
        this.applicationData.availability = updatedAvailability;

        return { success: true, value: updatedAvailability };
    }

    /**
     * Get only the selected competencies.
     * 
     * @returns {Array<Object>} - The list of competencies that are selected.
     */
    getSelectedCompetencies() {
        return this.applicationData.competencies.filter(comp => comp.selected);
    }

    /**
     * Get the current application data, including competencies and availability.
     * 
     * @returns {Object} - The current application data.
     */
    getApplicationData() {
        return this.applicationData;
    }

    /**
     * Submit the application with selected competencies and availability periods.
     * 
     * @returns {Promise<Object>} - A response indicating the success or failure of the application submission.
     */
    async submitApplication() {
        this.responses = [];

        if (this.applicationData.availability.length === 0) {
            return { success: false, message: "Please add at least one availability period." };
        }

        if (this.applicationData.availability.some(period => !period.from || !period.to)) {
            return { success: false, message: "Please complete all availability periods." };
        }

        try {
            for (const expertise of this.applicationData.competencies) {
                if (expertise.selected) {
                    const response = await applySource.competence({
                        competenceId: expertise.id,
                        yearsOfExperience: expertise.yearsOfExperience
                    });
                    this.responses.push(response);
                    console.log(response);
                }
            }

            for (const date of this.applicationData.availability) {
                const response = await applySource.availability(date);
                this.responses.push(response);
                console.log(response);
            }
            const allSucceeded = this.responses.every(res => res.success);
            return allSucceeded
                ? { success: true, message: "Application submitted successfully!" }
                : { success: false, message: "Failed to submit application", responses: this.responses };
        } catch (error) {
            return { success: false, message: "An error occurred while submitting the application." };
        }
    }
}
