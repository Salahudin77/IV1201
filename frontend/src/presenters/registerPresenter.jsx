import { RegisterModel } from "../models/registerModel";

/**
 * Presenter for handling the user registration process.
 * This class interacts with the RegisterModel to manage registration and updates the view accordingly.
 */
export class RegisterPresenter {
    /**
     * Creates an instance of the RegisterPresenter.
     * @param {Function} updateView - The function to update the view with success or error messages.
     */
    constructor(updateView) {
        this.model = new RegisterModel();
        this.updateView = updateView; // Store the update function
    }

    /**
     * Handles the user registration process by calling the register method from the model.
     * It updates the view with success or error messages based on the response.
     * @async
     * @param {Object} userData - The user data for registration (e.g., username, email, password).
     * @returns {Object} The response from the registration API containing success status and message.
     */
    async handleRegister(userData) {
        try {
            const response = await this.model.register(userData);

            // Update the view with the success message from the response
            this.updateView({ successMessage: response.message, errorMessage: null });
            console.log(response.message);

            return response;
        } catch (error) {
            // Update the view with the error message in case of failure
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }
}
