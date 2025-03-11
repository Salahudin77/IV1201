const recruiter = {
    /**
     * Fetches a list of all applications from the backend.
     * 
     * This function sends a GET request to the backend API to retrieve all applications.
     * It handles errors gracefully and ensures the response is valid and properly formatted.
     *
     * @returns {Promise<Object>} A promise that resolves to an object containing the applications data.
     *    If the request is successful, the response data is returned. If there is an error,
     *    it returns an object with a `success` status of `false` and an error message.
     * @throws {Error} Throws an error if the request fails or the response is not in the expected format.
     */
    async listApplications() {
        try {
            // Send GET request to backend using fetch
            const response = await fetch('http://localhost:8080/api/fetchAllApplications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows we're expecting JSON
                },
                credentials: 'include',
            });

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                const errorMessage = await response.text(); // Capture the error message from the server
                throw new Error(`Failed to fetch applications: ${response.status} ${response.statusText}. ${errorMessage}`);
            }

            // Parse and return the response JSON, if valid
            const data = await response.json();

            // Check if the response is empty or not formatted correctly
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid response format or empty data.');
            }

            return data;

        } catch (error) {
            console.error('Error fetching applications:', error);
            // Return a structured error message
            return { success: false, message: error.message || 'Fetching applications failed' };
        }
    },
};

export default recruiter;
