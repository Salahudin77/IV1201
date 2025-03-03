const BackendSource = {
    async HTTPrequest(request, userData, endpoint) {
        try {
            // Construct the full URL dynamically using the provided endpoint string
            const url = `http://localhost:8080/api/${endpoint}`;

            // Create the request options
            const options = {
                method: request,
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
                },
            };

            // If the request is not a GET request and userData is provided, include the body
            if (request !== 'GET' && userData) {
                options.body = JSON.stringify(userData);  // Send the form data as JSON
            }

            // Send the request using fetch
            const response = await fetch(url, options);

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`Failed to ${endpoint}: ${response.status} ${response.statusText}`);
            }

            // Parse and return the response JSON
            return await response.json();

        } catch (error) {
            console.error(`${endpoint} error:`, error);
            return { success: false, message: error.message || `${endpoint} failed` };
        }
    },
};

export default BackendSource;
