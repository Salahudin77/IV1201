import { LoginModel } from "../models/loginModel";

export class LoginPresenter {
    constructor(updateView) {
        this.model = new LoginModel();
        this.updateView = updateView; // Store the update function
    }

    async handleLogin(userData) {
        try {
            const response = await this.model.login(userData);
            window.location.reload();
            this.updateView({ successMessage: response.message, errorMessage: null });

            return response;
        } catch (error) {
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }

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
