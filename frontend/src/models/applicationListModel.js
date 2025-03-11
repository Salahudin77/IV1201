import recruiter from "../recruiterSource";

/**
 * ApplicationListModel is responsible for managing the list of applications,
 * fetching them from an external source, and providing filtering capabilities.
 */
export class ApplicationListModel {
    constructor() {
        /**
         * The list of applications retrieved from the API/database.
         * @type {Array<Object>}
         */
        this.applications = [];

        /**
         * Flag indicating whether the applications are being loaded.
         * @type {boolean}
         */
        this.isLoading = false;

        /**
         * Holds any error message if fetching applications fails.
         * @type {string|null}
         */
        this.error = null;
    }

    /**
     * Fetch applications from an external API or database.
     * 
     * @returns {Promise<Array<Object>>} - A promise that resolves to an array of applications.
     * @throws {Error} - Throws an error if fetching the applications fails.
     */
    async fetchApplications() {
        this.isLoading = true;
        this.error = null;

        try {
            // Call the recruiter.listApplications() function to get the applications
            const data = await recruiter.listApplications();
    
            // Assuming recruiter.listApplications() returns the application data
            this.applications = data;
            return this.applications;
        } catch (error) {
            this.error = error.message || 'Failed to fetch applications';
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get applications filtered by a specified criterion.
     * 
     * @param {Object} [filterCriteria] - The criteria to filter applications by.
     * @returns {Array<Object>} - A filtered array of applications based on the provided criteria.
     */
    getFilteredApplications(filterCriteria) {
        if (!filterCriteria) return this.applications;

        return this.applications.filter(app => {
            // Implement your filtering logic here
            // Example: return app.status === filterCriteria;
            return true;
        });
    }
}

export default ApplicationListModel;
