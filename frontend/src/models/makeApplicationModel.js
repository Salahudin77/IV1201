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
        if (this.applicationData.availability.length === 0) {
            console.warn("No availability periods added.");
            return { success: false, message: "Please add at least one availability period." };
        }

        // Check for incomplete periods
        const incomplete = this.applicationData.availability.some(
            period => period.from === null || period.to === null
        );

        if (incomplete) {
            console.warn("Incomplete availability period detected.");
            return { success: false, message: "Please complete all availability periods." };
        }

        try {
            console.log("Submitting expertise entries...");
            // Submit only the selected competencies
            for (const expertise of this.applicationData.competencies) {
                if (expertise.selected) {
                    // Create a new object with only competenceId and yearsOfExperience
                    const selectedExpertise = {
                        competenceId: expertise.id, // Use `id` here
                        yearsOfExperience: expertise.yearsOfExperience
                    };

                    // Log the new object
                    await applySource.competence(selectedExpertise)
                }
            }

            console.log("Submitting availability periods...");
            for (const date of this.applicationData.availability) {
                if (date.from !== null && date.to !== null) {
                    await applySource.availability(date)
                }

              
            }

            console.log("Application successfully submitted.");
            return { success: true, message: "Application submitted successfully!", resetData: this.applicationData };

        } catch (error) {
            console.error("Error submitting application:", error);
            return { success: false, message: "An error occurred while submitting the application." };
        }
    }
}
