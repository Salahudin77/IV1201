import UserSource from "../userSource";

export class LoginModel {
    constructor() {
        this.user = null;
    }

    async login(credentials) {
        try {
            
            
            const apiResponse = await UserSource.login(credentials);
           

            if (apiResponse.success) {
                
                return { success: true, user: this.user };
            } else {
                return { success: false, message: "Invalid credentials" };
            }
        } catch (error) {
            return { success: false, message: "Login failed" };
        }
    }
    async logout() {
        const response =await UserSource.logout();
        return response
    }
}
