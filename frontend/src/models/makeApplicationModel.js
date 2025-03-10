import applySource from "../applySource";

// Using toISOString to format the date
export class MakeApplicationModel {
    constructor() {
        this.applicationData = {
            competencies: [
                { id: 1, name: "Ticket sales", selected: false, yearsOfExperience: 0.0 },
                { id: 2, name: "Lotteries", selected: false, yearsOfExperience: 0.0 },
                { id: 3, name: "Roller coaster operation", selected: false, yearsOfExperience: 0.0 }
            ],
            availability: [] // Store availability periods
        };
        
    }

    // Set experience for a specific competenceId
    setExperience(competenceId, value) {
        console.log(this.applicationData)
        const numericValue = parseFloat(value);
        if (numericValue < 0) {
            return { success: false, message: "Invalid input: Must be a valid non-negative number." };
        }
        // Update the corresponding experience based on competenceId
        const experience = this.applicationData.competencies.find(exp => exp.id === competenceId); // Fix here: change `competenceId` to `id`
        if (experience) {
            experience.yearsOfExperience = numericValue;
        }
        return { success: true, value: numericValue };
    }

    // Toggle the competence selected state
    toggleCompetence(competenceId) {
        const competence = this.applicationData.competencies.find(comp => comp.id === competenceId); // Fix here: change `competenceId` to `id`
        if (competence) {
            competence.selected = !competence.selected;
        }
        return { success: true };
    }

    // Add a new availability period
    addAvailabilityPeriod() {
        const newAvailability = { from: null, to: null };
        this.applicationData.availability.push(newAvailability);
        return [...this.applicationData.availability]; // Return a copy of the array
    }

    // Utility function to format date to YYYY-MM-DD
    formatDate(date) {
        if (date) {
            return new Date(date).toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
        }
        return null; // Return null if no date is provided
    }

    // Set availability for a specific period
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

    // Get only the selected competencies
    getSelectedCompetencies() {
        return this.applicationData.competencies.filter(comp => comp.selected);
    }

    // Get the current application data
    getApplicationData() {
        return this.applicationData;
    }

    // Submit the application (placeholder for actual submission logic)
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
                    console.log(response)
                }
            }

            for (const date of this.applicationData.availability) {
                const response = await applySource.availability(date);
                this.responses.push(response);
                console.log(response)
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
