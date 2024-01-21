import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import "../src/App.css";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SuggestionPage from "./pages/SuggestionPage";
import MoviesPage from "./pages/MoviesPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/welcome" element={<WelcomePage />} />
                <Route exact path="/details" element={<MovieDetailsPage />} />
                <Route exact path="/suggestion" element={<SuggestionPage />} />
                <Route exact path="/search" element={<MoviesPage />} />
            </Routes>
        </Router>
    );
}
