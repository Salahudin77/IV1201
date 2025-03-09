import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/homeView";
import LoginView from "./views/loginView";
import RegisterView from "./views/registerView";
import LoggedInApplicantView from "./views/loggedInApplicantView.jsx"
import LoggedInRecruiterView from "./views/loggedInRecruiterView.jsx";
import MakeApplicationView from "./views/makeApplicationView.jsx"
import ApplicationListView from "./views/applicationListView.jsx"
import DummyView from "./views/dummyView.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/appLogin" element={<LoggedInApplicantView/>} />
                <Route path="/recLogin" element={<LoggedInRecruiterView/>} />
                <Route path="/applicationForm" element={<MakeApplicationView/>} />
                <Route path="/home" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/applicationList" element={<ApplicationListView/>} />
                <Route path="/dummy" element={<DummyView/>} />
                
            </Routes>
        </Router>
    );
}

export default App;
