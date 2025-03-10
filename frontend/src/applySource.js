const applySource = {
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
            console.error('Error updating availability:', error);
            return { success: false, message: error.message || 'Failed to update availability' };
        }
    },
};

export default applySource;