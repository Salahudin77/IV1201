const applySource = {
    /**
     * Adds a competence (expertise) to the backend via a POST request.
     *
     * @param {Object} expertise - The competence object to be added.
     * @param {string} expertise.skill - The skill name.
     * @param {number} expertise.level - The proficiency level of the skill.
     * @returns {Promise<Object>} A promise that resolves to the response from the backend.
     *    It returns an object with `success` status and a `message`.
     *    If the response contains JSON, it will be returned as the result.
     *    If not, the raw text response will be returned.
     * @throws {Error} Throws an error if the fetch fails or the response is not ok.
     */
    async competence(expertise) {
        try {
            const response = await fetch('http://localhost:8080/api/addCompetence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(expertise),
            });
    
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to add competence: ${response.status} ${text}`);
            }
    
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                const text = await response.text(); // Read response as text
                return { success: true, message: text }; // Treat as success but return the text
            }
    
        } catch (error) {
            console.error('Error adding competence:', error);
            return { success: false, message: error.message || 'Failed to add competence' };
        }
    },
    
    /**
     * Updates availability dates in the backend via a POST request.
     *
     * @param {Array} dates - The dates to be updated.
     * @param {string} dates[].startDate - The start date of availability.
     * @param {string} dates[].endDate - The end date of availability.
     * @returns {Promise<Object>} A promise that resolves to the response from the backend.
     *    It returns an object with `success` status and a `message`.
     *    If the response contains JSON, it will be returned as the result.
     *    If not, the raw text response will be returned.
     * @throws {Error} Throws an error if the fetch fails or the response is not ok.
     */
    async availability(dates) {
        try {
            const response = await fetch("http://localhost:8080/api/availability", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dates)
            });
    
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to update availability: ${response.status} ${text}`);
            }
    
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                const text = await response.text(); // Read response as text
                return { success: true, message: text }; // Treat as success but return the text
            }
        } catch (error) {
            console.error('Error updating availability:', error);
            return { success: false, message: error.message || 'Failed to update availability' };
        }
    },
};

export default applySource;
