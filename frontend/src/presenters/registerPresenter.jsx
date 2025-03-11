import { RegisterModel } from "../models/registerModel";


export class RegisterPresenter {
    constructor(updateView) {
        this.model = new RegisterModel();
        this.updateView = updateView; // Store the update function
    }

    async handleRegister(userData) {
        try {
            const response = await this.model.register(userData);
            

            this.updateView({ successMessage: response.message, errorMessage: null });
            console.log(response.message)
            return response
        } catch (error) {
            this.updateView({ successMessage: null, errorMessage: error.message });
        }
    }

}
