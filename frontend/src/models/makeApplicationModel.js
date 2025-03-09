export class MakeApplicationModel {
    constructor() {
        this.applicationData = {
            experiences: [
                { competenceId: 1, yearsOfExperience: 0.0 },
                { competenceId: 2, yearsOfExperience: 0.0 },
                { competenceId: 3, yearsOfExperience: 0.0 }
            ],
            availability: [] // Store availability periods
        };
    }

    // Set experience for a specific competenceId
    setExperience(competenceId, value) {
        const numericValue = parseFloat(value);
        console.log(this.applicationData)
        if (numericValue < 0) {
            return { success: false, message: "Invalid input: Must be a valid non-negative number." };
        }
        // Update the corresponding experience based on competenceId
        const experience = this.applicationData.experiences.find(exp => exp.competenceId === competenceId);
        if (experience) {
            experience.yearsOfExperience = numericValue;
        }
        return { success: true, value: numericValue };
    }

    // Add a new availability period
    addAvailabilityPeriod() {
        const newAvailability = { from: null, to: null };
        this.applicationData.availability.push(newAvailability);
        return [...this.applicationData.availability]; // Return a copy of the array
    }

    // Set availability for a specific period
    setAvailability(index, field, date) {
        const updatedAvailability = this.applicationData.availability.map(period => ({...period}));

        // Ensure the period exists
        if (!updatedAvailability[index]) {
            updatedAvailability[index] = { from: null, to: null };
        }

        const updatedPeriod = {
            from: updatedAvailability[index].from,
            to: updatedAvailability[index].to,
            [field]: date // Update only the specific field
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

    // Get the current application data
    getApplicationData() {
        return this.applicationData;
    }

    // Submit the application (placeholder for actual submission logic)
    submitApplication() {
        if (this.applicationData.availability.length === 0) {
            return { success: false, message: "Please add at least one availability period." };
        }

        // Check for incomplete periods
        const incomplete = this.applicationData.availability.some(
            period => period.from === null || period.to === null
        );

        if (incomplete) {
            return { success: false, message: "Please complete all availability periods." };
        }

        console.log("Submitting application:", this.applicationData);
        return { success: true, message: "Application submitted successfully!", resetData: this.applicationData };
    }
}
