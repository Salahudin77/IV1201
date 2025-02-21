export class MakeApplicationModel {
    constructor() {
        this.applicationData = {
            experiences: {}, // Store experiences in years
            availability: { from: null, to: null }
        };
    }


    setExperience(jobRole, value) {
        const regex = /^\d*\.?\d{0,2}$/; // Allows only numbers with up to 2 decimal places

        if (!regex.test(value)) {
            return { success: false, message: "Invalid input: Use a number with up to 2 decimal places." };
        }

        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            return { success: false, message: "Invalid input: Must be a valid number." };
        }

        this.applicationData.experiences[jobRole] = numericValue;
        return { success: true, message: "Experience updated successfully." };
    }


    getExperience(jobRole) {
        return this.applicationData.experiences[jobRole] || 0;
    }
}
