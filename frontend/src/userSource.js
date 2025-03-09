// No additional imports needed since fetch is built-in
// However, if you need any future imports for other utilities, you can add them here

const UserSource = {
    async createAccount(userData) {
        // Define the form data as a static object with new values
      console.log(userData)
        try {
            // Send POST request to backend using fetch
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
                },
                credentials: 'include',
                body: JSON.stringify(userData),  // Send the form data as JSON
            });

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Failed to register');
            }

            // Parse and return the response JSON
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed' };
        }
    },
    async login(userData) {
        // Define the form data as a static object with new values
      
        try {
            // Send POST request to backend using fetch
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
                },
                credentials: 'include',
                body: JSON.stringify(userData),  // Send the form data as JSON
            });

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Failed to login');
            }

            // Parse and return the response JSON
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('login error:', error);
            return { success: false, message: 'login failed' };
        }
    },
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
