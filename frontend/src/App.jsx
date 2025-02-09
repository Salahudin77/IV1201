import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/homeView";
import LoginView from "./views/loginView";
import RegisterView from "./views/registerView";
import DummyView from "./views/dummyView";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/home" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/dummy" element={<DummyView />} />

            </Routes>
        </Router>
    );
}

export default App;
