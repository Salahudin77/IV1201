export class MakeApplicationModel {
    constructor() {
        this.applicationData = {
            experiences: {
                ticketSales: "",
                lotteries: "",
                rollerCoasterOperation: "",
            },
            availability: [] // Store availability periods
        };
    }

    // Set experience for a job role
    setExperience(jobRole, value) {
        const numericValue = parseFloat(value);
        if (numericValue < 0) {
            return { success: false, message: "Invalid input: Must be a valid non-negative number." };
        }
        this.applicationData.experiences[jobRole] = numericValue;
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
        // Create a full copy of the availability array
        const updatedAvailability = this.applicationData.availability.map(period => ({...period}));

        // Ensure the period exists
        if (!updatedAvailability[index]) {
            updatedAvailability[index] = { from: null, to: null };
        }

        // Important: Create a new object with both fields preserved
        const updatedPeriod = {
            from: updatedAvailability[index].from,
            to: updatedAvailability[index].to,
            [field]: date // Update only the specific field
        };

        // Validation: Ensure 'from' is before 'to'
        if (updatedPeriod.from && updatedPeriod.to && updatedPeriod.from > updatedPeriod.to) {
            return { success: false, message: "'From' date must be before 'To' date." };
        }

        // Update the period in our copy
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
        // Basic validation
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