import { LoginModel } from "../models/loginModel";

/**
 * Presenter for handling login and logout logic.
 * This class interacts with the LoginModel to manage login and logout operations
 * and updates the view based on the responses.
 */
export class LoginPresenter {
    /**
     * Creates an instance of the LoginPresenter.
     * @param {Function} updateView - The function to update the view with success or error messages.
     */
    constructor(updateView) {
        this.model = new LoginModel();
        this.updateView = updateView; // Store the update function
    }

    /**
     * Handles the login process by calling the login method from the model.
     * It updates the view with a success or error message based on the response.
     * @async
     * @param {Object} userData - The user credentials for login (usually includes username and password).
     * @returns {Object} The response from the login API containing success status and message.
     */
    async handleLogin(userData) {
        try {
            const response = await this.model.login(userData);
            console.log(response);
            
            if (response.success) {
                window.location.reload(); // Reload the page on successful login
            }

            this.updateView({ successMessage: response.message, errorMessage: null });

            return response;
        } catch (error) {
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }

    /**
     * Handles the logout process by calling the logout method from the model.
     * It updates the view with a success or error message based on the response.
     * @async
     * @returns {Object} The response from the logout API containing success status and message.
     */
    async handleLogout() {
        try {
            const response = await this.model.logout(); // Call the logout method of the model
            this.updateView({ successMessage: response.message, errorMessage: null });
            return response;  // Returning the response to handle logout on the UI
        } catch (error) {
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }
}
