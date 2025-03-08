// applicationListPresenter.jsx
import { useState, useEffect } from 'react';
import ApplicationListModel from '../models/applicationListModel';

export const useApplicationListPresenter = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const model = new ApplicationListModel();

    // Load applications when component mounts
    const loadApplications = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await model.fetchApplications();
            setApplications(data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching applications');
            console.error('Error fetching applications:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter applications (if needed)
    const filterApplications = (criteria) => {
        const filtered = model.getFilteredApplications(criteria);
        setApplications(filtered);
    };

    // Initial load
    useEffect(() => {
        loadApplications();
    }, []);

    return {
        applications,
        isLoading,
        error,
        refresh: loadApplications,
        filter: filterApplications
    };
};

export default useApplicationListPresenter;