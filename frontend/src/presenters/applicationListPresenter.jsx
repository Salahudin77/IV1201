import { useState } from 'react';
import ApplicationListModel from '../models/applicationListModel';  // Ensure this import is correct

export const useApplicationListPresenter = () => {
    const [applications, setApplications] = useState([]);  // Store fetched applications
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const model = new ApplicationListModel();  // Create an instance of the model

    const fetchApplications = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await model.fetchApplications();  // Fetch from the model
            setApplications(data);  // Store the fetched data
        } catch (err) {
            setError(err.message || 'An error occurred while fetching applications');
            console.error('Error fetching applications:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        applications,
        isLoading,
        error,
        fetchApplications,  // Expose the function to fetch applications
    };
};

export default useApplicationListPresenter;
