const applySource = {
    async competence(expertise) {
        try {
            // Send POST request to backend using fetch
            const response = await fetch('http://localhost:8080/api/addCompetence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
                },
                credentials: 'include',
                body: JSON.stringify(expertise),  // Send the form data as JSON
            });

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`Failed to add competence: ${response.status} ${response.statusText}`);
            }

            // Parse and return the response JSON
            return await response.json();

        } catch (error) {
            console.error('Error adding competence:', error);
            return { success: false, message: error.message || 'Failed to add competence' };
        }
    },

    async availability(dates) {
        try {
            // Send POST request to backend using fetch
            const response = await fetch("http://localhost:8080/api/availability", {
                method: "POST",
                credentials: "include",   // This is crucial for cross-site or if you want cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dates)
            });

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`Failed to update availability: ${response.status} ${response.statusText}`);
            }

            // Parse and return the response JSON
            return await response.json();

        } catch (error) {
            console.error('Error updating availability:', error);
            return { success: false, message: error.message || 'Failed to update availability' };
        }
    },
};

export default applySource;
