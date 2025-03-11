import UserSource from "../userSource";

/**
 * RegisterModel class responsible for handling user registration and login processes.
 */
export class RegisterModel {

    /**
     * Registers a new user, attempts login if registration is successful.
     * 
     * @param {Object} userData - The user data object containing `userName` and `password`.
     * @param {string} userData.userName - The username for the new account.
     * @param {string} userData.password - The password for the new account.
     * @returns {Promise<Object>} - The response object from the registration API or error response if failed.
     */
    async register(userData) {
        // Simulate delay with async/await
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        const { userName: username, password } = userData;
        const credentials = { username, password };
        console.log(credentials);
    
        try {
            // Attempt to create a new account
            const apiResponse = await UserSource.createAccount(userData); // for register
            console.log(apiResponse);
    
            // If registration is successful, automatically log the user in
            if (apiResponse.success) {
                const loginResponse = await this.login(credentials); // Call login with the new credentials
            }
            
            return apiResponse;
        } catch (error) {
            return { success: false, message: "API registration failed!" };
        }
    }

    /**
     * Logs in a user with the provided credentials.
     * 
     * @param {Object} credentials - The credentials object containing `username` and `password`.
     * @param {string} credentials.username - The username to login with.
     * @param {string} credentials.password - The password to login with.
     * @returns {Promise<Object>} - The login response object from the API.
     * @throws {Error} - If the login fails, throws an error.
     */
    async login(credentials) {
        try {
            // Logic to login the user
            const loginApiResponse = await UserSource.login(credentials); // for login
            return loginApiResponse; // return response if needed
        } catch (error) {
            throw new Error("Login failed");
        }
    }
}
