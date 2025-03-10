import { RegisterModel } from "../models/registerModel";

export default class RegisterPresenter {
    constructor(updateView) {
        this.model = new RegisterModel();
        this.updateView = updateView;
    }

    async handleRegister(userData) {
        try {
            const response = await this.model.register(userData);
            this.updateView({ successMessage: response.message, errorMessage: null });
        } catch (error) {
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }
}
