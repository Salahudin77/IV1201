// No additional imports needed since fetch is built-in
// However, if you need any future imports for other utilities, you can add them here

const UserSource = {
    async createAccount(userData) {
        // Define the form data as a static object with new values
      
        try {
            // Send POST request to backend using fetch
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
                },
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
};

export default UserSource;
