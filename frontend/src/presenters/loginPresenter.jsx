import { LoginModel } from "../models/loginModel";

export class LoginPresenter {
    constructor(updateView) {
        this.model = new LoginModel();
        this.updateView = updateView; // Store the update function
    }

    async handleRegister(userData) {
        try {
            const response = await this.model.login(userData);
            this.updateView({ successMessage: response.message, errorMessage: null });
        } catch (error) {
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }
}
