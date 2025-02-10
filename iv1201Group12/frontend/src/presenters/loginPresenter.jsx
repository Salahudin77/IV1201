import { LoginModel } from "../models/loginModel";

export class LoginPresenter {
    constructor(updateView) {
        this.model = new LoginModel();
        this.updateView = updateView;
    }

    async handleLogin(username, password) {
        try {
            const response = await this.model.login(username, password);
            this.updateView({ user: response.user, error: null });
        } catch (error) {
            this.updateView({ user: null, error: error.message });
        }
    }
}
