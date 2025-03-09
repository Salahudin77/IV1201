import { MakeApplicationModel } from "../models/makeApplicationModel";

export class MakeApplicationPresenter {
    constructor(setApplicationData) {
        this.model = new MakeApplicationModel();
        this.setApplicationData = setApplicationData;
        // Bind methods
        this.handleExperienceChange = this.handleExperienceChange.bind(this);
        this.addAvailabilityPeriod = this.addAvailabilityPeriod.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
        this.submitApplication = this.submitApplication.bind(this);
    }

    // Handle experience change
    handleExperienceChange(jobRole, value) {
        const result = this.model.setExperience(jobRole, value);
        if (result.success) {
            // Update the view with the entire application data
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        } else {
            alert(result.message);
        }
    }

    // Add a new availability period
    addAvailabilityPeriod() {
        this.model.addAvailabilityPeriod();

        // Update the view with the entire application data
        this.setApplicationData({
            ...this.model.getApplicationData()
        });
    }

    // Handle availability change
    handleAvailabilityChange(index, field, date) {
        const result = this.model.setAvailability(index, field, date);

        if (result.success) {
            // Update the view with the entire application data to ensure consistency
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        } else {
            alert(result.message);
        }
    }

    // Submit the application
    submitApplication() {
        const result = this.model.submitApplication();

        if (result.success) {
            alert(result.message);
            // Here you would typically navigate to another page or reset the form
        } else {
            alert(result.message);
        }
    }
}