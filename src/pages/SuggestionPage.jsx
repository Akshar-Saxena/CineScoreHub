import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import MovieCardGenre from "../components/MovieCardGenre";

export default function SuggestionPage() {
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const options = {
            method: "GET",
            url: "https://movies-tv-shows-database.p.rapidapi.com/",
            params: {
                year: location.state.data[2],
                page: "1",
            },
            headers: {
                Type: "get-movies-byyear",
                "X-RapidAPI-Key": import.meta.env.VITE_KEY_1,
                "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            // console.log(response.data);
            Object.entries(response.data.movie_results).forEach(
                (element, id) => {
                    setMovies((prev) => [...prev, element]);
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        // console.log(location.state.data);
        getMovies();
    }, []);
    return (
        <div className="bg-black">
            <NavBar />
            <div className=" w-[94%] m-auto">
                <h1 className="bg-clip-text py-4 mb-5 text-transparent w-fit text-5xl bg-gradient-to-r from-[#06D6A0] to-[#FFD166]">
                    Welcome, {location.state.data[0]}
                </h1>
            </div>
            <div className="pb-4 flex justify-evenly flex-wrap">
                {movies.map((element, id) => (
                    <MovieCardGenre
                        key={id}
                        token={element[1].imdb_id}
                        title={element[1].title}
                    />
                ))}
            </div>
        </div>
    );
}
