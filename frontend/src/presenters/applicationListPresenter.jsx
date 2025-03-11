import { useState } from 'react';
import ApplicationListModel from '../models/applicationListModel';  // Ensure this import is correct

/**
 * Custom hook that manages the application list state and fetch logic.
 * @returns {Object} The state and functions for managing the application list.
 * @returns {Array} applications - The list of fetched applications.
 * @returns {boolean} isLoading - A boolean that indicates if the applications are being loaded.
 * @returns {string | null} error - Error message if there was an error fetching the applications, otherwise null.
 * @returns {Function} fetchApplications - Function to fetch applications from the model.
 */
export const useApplicationListPresenter = () => {
    const [applications, setApplications] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const model = new ApplicationListModel();  

    /**
     * Fetches the list of applications from the model and updates state accordingly.
     * Sets the loading state while fetching and handles success/error responses.
     * @async
     * @function
     * @returns {void}
     */
    const fetchApplications = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await model.fetchApplications();  // Fetch from the model

            // If the response is an array (successful fetch), update the applications state
            if (Array.isArray(response)) {
                setApplications(response);
            } else {
                // If it's an error response (not an array), set the error
                setError(response.message || 'An error occurred');
                console.warn(response.message || 'An error occurred');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching applications');
            console.warn('Error fetching applications:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        applications,
        isLoading,
        error,
        fetchApplications,  
    };
};
