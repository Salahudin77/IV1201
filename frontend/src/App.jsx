import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/homeView";
import LoginView from "./views/loginView";
import RegisterView from "./views/registerView";
import LoggedInApplicantView from "./views/loggedInApplicantView.jsx";
import LoggedInRecruiterView from "./views/loggedInRecruiterView.jsx";
import MakeApplicationView from "./views/makeApplicationView.jsx";
import ApplicationListView from "./views/applicationListView.jsx";
import DummyView from "./views/dummyView.jsx";

function App() {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); // Initialize state with role from localStorage

    // Use useEffect to update state if localStorage changes
    useEffect(() => {
        // Listen for changes in localStorage
        const handleStorageChange = () => {
            const role = localStorage.getItem('userRole');
            setUserRole(role); // Update state whenever localStorage is updated
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange); // Cleanup the event listener on component unmount
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                
                {/* Restrict access to routes based on the role */}
                <Route path="/appLogin" element={userRole === 'ROLE_APPLICANT' ? <LoggedInApplicantView /> : <Navigate to="/login" />} />
                <Route path="/recLogin" element={userRole === 'ROLE_RECRUITER' ? <LoggedInRecruiterView /> : <Navigate to="/login" />} />
                <Route path="/applicationForm" element={userRole === 'ROLE_APPLICANT' ? <MakeApplicationView /> : <Navigate to="/login" />} />
                <Route path="/home" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/applicationList" element={userRole === 'ROLE_RECRUITER' ? <ApplicationListView /> : <Navigate to="/login" />} />
                <Route path="/dummy" element={<DummyView />} />
            </Routes>
        </Router>
    );
}

export default App;
