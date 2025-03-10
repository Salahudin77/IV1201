import { useNavigate } from "react-router-dom";
import { useApplicationListPresenter } from "../presenters/applicationListPresenter";
import { Header } from "./header.jsx";
import "../styles/applicationList.css";
import { useTranslation } from "react-i18next";

export const ApplicationListView = () => {
    const navigate = useNavigate();
    const { applications, isLoading, error, fetchApplications } = useApplicationListPresenter();
    const { t } = useTranslation();
    const handleLogout = () => {
        //localStorage.removeItem("authToken");  // Adjust based on your auth implementation
        navigate("/login");
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="page-container">
                <div className="container">
                    <button className="back-link" onClick={() => navigate(-1)}>{t('backToPreviousScreen')}</button>

                    <h1>{t('applicationsHeading')}</h1>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button onClick={fetchApplications} className="fetch-button">
                        {t('fetchApplications')}
                    </button>

                    {isLoading ? (
                        <div className="loading-indicator">{t('loadingApplications')}</div>
                    ) : (
                        <div className="table-container">
                            <div className="table-header">
                                <div className="header-cell">{t('fullName')}</div>
                                <div className="header-cell">status</div>
                            </div>

                            <div className="table-content">
                                {applications.length > 0 ? (
                                    applications.map((app, index) => (
                                        <div className="table-row" key={app.id || index}>
                                            <div className="cell">{app.firstName + " " + app.lastName || t('unknown')}</div>
                                            <div className="cell">{t("unhandled") || t('pending')}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-message">{t('noApplicationsFound')}</div>
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
