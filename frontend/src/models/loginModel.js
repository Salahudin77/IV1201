import UserSource from "../userSource";

/**
 * Class representing the login model.
 */
export class LoginModel {
    /**
     * Creates an instance of LoginModel.
     * Initializes the user property to null.
     */
    constructor() {
        /**
         * The user object, initially set to null.
         * @type {Object|null}
         */
        this.user = null;
    }

    /**
     * Logs in the user with the provided credentials.
     * 
     * @param {Object} credentials - The login credentials for authentication.
     * @param {string} credentials.username - The username for login.
     * @param {string} credentials.password - The password for login.
     * 
     * @returns {Promise<Object>} The result of the login attempt, containing success status and message.
     */
    async login(credentials) {
        try {
            const apiResponse = await UserSource.login(credentials);
            console.log(apiResponse);

            if (apiResponse.success) {
                return { success: true, message: "Logged In" };
            } else {
                return { success: false, message: "Login Failed" };
            }
        } catch (error) {
            return { success: false, message: "Login failed" };
        }
    }

    /**
     * Logs out the user.
     * 
     * @returns {Promise<Object>} The response from the logout operation.
     */
    async logout() {
        const response = await UserSource.logout();
        return response;
    }
}
