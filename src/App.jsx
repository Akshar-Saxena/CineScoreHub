import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import "../src/App.css";
import MovieDetailsPage from "./pages/MovieDetailsPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/welcome" element={<WelcomePage />} />
                <Route exact path="/details" element={<MovieDetailsPage />} />
            </Routes>
        </Router>
    );
}
