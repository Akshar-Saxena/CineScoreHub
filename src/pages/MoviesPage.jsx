import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const getMovies = async () => {
        const options = {
            method: "GET",
            url: "https://movies-tv-shows-database.p.rapidapi.com/",
            params: {
                title: location.state.query,
            },
            headers: {
                Type: "get-movies-by-title",
                "X-RapidAPI-Key": import.meta.env.VITE_KEY_1,
                "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            // console.log(response.data);
            try {
                setMovies(response.data.movie_results);
            } catch (e) {
                console.log(movies);
                setMovies([]);
            }
        } catch (error) {
            setMovies([]);
            console.error(error);
        }
    };
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div className="bg-black min-h-screen max-h-fit w-full">
            <NavBar />
            <div className=" w-[94%] m-auto">
                <h1 className="bg-clip-text py-4 mb-5 text-transparent w-fit text-5xl bg-gradient-to-r from-[#06D6A0] to-[#FFD166]">
                    Search Results for {location.state.query}
                </h1>
            </div>
            <div className="pb-4 flex justify-evenly flex-wrap">
                {movies != undefined &&
                    movies.map((element, id) => (
                        <MovieCard
                            key={id}
                            token={element.imdb_id}
                            title={element.title}
                        />
                    ))}
                {movies == undefined && (
                    <h1 className="text-white">No Movie Found</h1>
                )}
            </div>
        </div>
    );
}
