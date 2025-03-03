const applySource = {
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
                throw new Error(`Failed to fetch applications: ${response.status} ${response.statusText}`);
            }

            // Parse and return the response JSON
            return await response.json();

        } catch (error) {
            console.error('Error fetching applications:', error);
            return { success: false, message: error.message || 'Fetching applications failed' };
        }
    },
};

export default applySource;
