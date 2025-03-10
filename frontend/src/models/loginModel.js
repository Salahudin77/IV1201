import UserSource from "../userSource";

export class LoginModel {
    constructor() {
        this.user = null;
    }

    async login(credentials) {
        try {
            
            
            const apiResponse = await UserSource.login(credentials);
           console.log(apiResponse)

            if (apiResponse.success) {
                
                return { success: true, message: "Logged In" };
            } else {
                return { success: false, message: "Login Failed" };
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
