import { MakeApplicationModel } from "../models/makeApplicationModel"; 

export class MakeApplicationPresenter {
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

    // Handle experience change for a specific competence
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

    // Toggle the competence selected state
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

    // Add a new availability period
    addAvailabilityPeriod() {
        const result = this.model.addAvailabilityPeriod();
        if (result) {
            // Update the view with the entire application data after adding availability
            this.setApplicationData({
                ...this.model.getApplicationData()
            });
        }
    }

    // Handle availability change (for 'from' or 'to' date)
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

    // Submit the application
    async  submitApplication() {
      
         const result = await this.model.submitApplication();

        if (result.success) {
            alert(result.message);
            // Here you would typically navigate to another page or reset the form
        } else {
            alert(result.message);
        }
    }
}
