import { useNavigate } from "react-router-dom";
import { useApplicationListPresenter } from "../presenters/applicationListPresenter";
import { Header } from "./header.jsx";
import "../styles/applicationList.css";

export const ApplicationListView = () => {
    const navigate = useNavigate();
    const { applications, isLoading, error, fetchApplications } = useApplicationListPresenter();

    const handleLogout = () => {
        localStorage.removeItem("authToken");  // Adjust based on your auth implementation
        navigate("/login");
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="page-container">
                <div className="container">
                    <button className="back-link" onClick={() => navigate(-1)}>Back to previous screen</button>

                    <h1>Please find all applications below:</h1>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button onClick={fetchApplications} className="fetch-button">
                        Fetch Applications
                    </button>

                    {isLoading ? (
                        <div className="loading-indicator">Loading applications...</div>
                    ) : (
                        <div className="table-container">
                            <div className="table-header">
                                <div className="header-cell">Full Name</div>
                                <div className="header-cell">Status</div>
                            </div>

                            <div className="table-content">
                                {applications.length > 0 ? (
                                    applications.map((app, index) => (
                                        <div className="table-row" key={app.id || index}>
                                            <div className="cell">{app.name || 'Unknown'}</div>
                                            <div className="cell">{app.status || 'Pending'}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-message">No applications found</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicationListView;
