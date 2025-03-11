// No additional imports needed since fetch is built-in
// However, if you need any future imports for other utilities, you can add them here

const UserSource = {
    /**
     * Sends a POST request to the backend to register a new user.
     * 
     * @param {Object} userData - The user data to be sent for registration.
     * @param {string} userData.username - The username of the user.
     * @param {string} userData.password - The password of the user.
     * @param {string} userData.email - The email address of the user.
     * 
     * @returns {Promise<Object>} A promise that resolves to an object indicating success or failure.
     *    If successful, returns `{ success: true, message: 'Registration succeeded' }`.
     *    If an error occurs, returns `{ success: false, message: 'Failed to register' }`.
     */
    async createAccount(userData) {
        console.log("Sending request to backend...", userData);
        
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });
    
            // If the response is not ok, handle the error.
            if (!response.ok) {
                const text = await response.text();
                console.log('Error response text:', text);
                throw new Error(text || 'Failed to register');
            }
    
            return { success: true, message: 'Registration succeeded' };
        } catch (error) {
            // Modify the error message here if fetch fails
            console.error('Registration error:', error);
            return { success: false, message: 'Failed to register' };
        }
    },
    
    /**
     * Sends a POST request to the backend to log in a user.
     * 
     * @param {Object} userData - The login credentials of the user.
     * @param {string} userData.username - The username of the user.
     * @param {string} userData.password - The password of the user.
     * 
     * @returns {Promise<Object>} A promise that resolves to an object indicating success or failure.
     *    If successful, returns `{ success: true, role: 'userRole' }` where `role` is the user's role.
     *    If an error occurs, returns `{ success: false, message: 'login failed' }`.
     */
    async login(userData) {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
    
            // Assuming the backend returns the role as plain text
            const role = await response.text(); // Use response.text() to get the plain text
    
            if (role) {
                // Store the role in localStorage
                localStorage.setItem('userRole', role);
            }
            console.log(localStorage.getItem('userRole'));
    
            return { success: true, role }; // You can return the role if needed
        } catch (error) {
            console.error('login error:', error);
            return { success: false, message: 'login failed' };
        }
    },
    
    /**
     * Sends a GET request to the backend to log out the user.
     * 
     * @returns {Promise<Object>} A promise that resolves to an object indicating success or failure.
     *    If successful, returns `{ success: true, message: 'Logout successful' }`.
     *    If an error occurs, returns `{ success: false, message: 'Logout failed' }`.
     */
    async logout() {
        try {
            // Send GET request to backend
            const response = await fetch('http://localhost:8080/api/logout', {
                method: 'GET',
                credentials: 'include', // Ensures cookies (like session tokens) are sent if needed
            });
    
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to logout');
            }
    
            return { success: true, message: 'Logout successful' };
    
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Logout failed' };
        }
    }
};

export default UserSource;
