import UserSource from "../userSource";

export class RegisterModel {
  
    async register(userData) {
        // Simulate delay with async/await
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        const { userName: username, password } = userData;
        const credentials = { username, password };
        console.log(credentials);
    
        try {
            // Attempt to create a new account
            const apiResponse = await UserSource.createAccount(userData); // for register
            console.log(apiResponse)
    
            // If registration is successful, automatically log the user in
            if(apiResponse.success){
                const loginResponse = await this.login(credentials); // Call login with the new credentials
            }
            
    
            return apiResponse
        } catch (error) {
            return { success: false, message: "API registration failed!" };
        }
    }
    
    // Assuming you have a login method like this
    async login(credentials) {
        try {
            // Logic to login the user, for example:
            const loginApiResponse = await UserSource.login(credentials); // for login
            return loginApiResponse; // return response if needed
        } catch (error) {
            throw new Error("Login failed");
        }
    }
    

}
