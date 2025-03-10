import { useState } from 'react';
import ApplicationListModel from '../models/applicationListModel';  // Ensure this import is correct

export const useApplicationListPresenter = () => {
    const [applications, setApplications] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const model = new ApplicationListModel();  

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


