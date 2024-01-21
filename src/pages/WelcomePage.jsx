import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import nowPlaying from "../constants/nowPlayingMovies.json";
import upcomingMovies from "../constants/upcomingMovies.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WelcomePage() {
    const [now, setNow] = useState([]);
    const navigate = useNavigate();
    const [up, setUp] = useState([]);
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [username, setUsername] = useState("");
    const years = [
        2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
        2012, 2011, 2010,
    ];
    const genreHandler = (e) => {
        setGenre(e.target.value);
    };
    const nameHandler = (e) => {
        setUsername(e.target.value);
    };
    const yearHandler = (e) => {
        setYear(e.target.value);
    };
    const getSuggestion = () => {
        navigate("/suggestion", {
            state: { data: [username, genre, year] },
        });
    };
    const getMovies = async () => {
        const optionsUp = {
            method: "GET",
            url: "https://movies-tv-shows-database.p.rapidapi.com/",
            params: { page: "3" },
            headers: {
                Type: "get-upcoming-movies",
                "X-RapidAPI-Key": import.meta.env.VITE_KEY_1,
                "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
            },
        };
        const optionsNow = {
            method: "GET",
            url: "https://movies-tv-shows-database.p.rapidapi.com/",
            params: { page: "4" },
            headers: {
                Type: "get-nowplaying-movies",
                "X-RapidAPI-Key": import.meta.env.VITE_KEY_1,
                "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
            },
        };

        try {
            const responseUp = await axios.request(optionsUp);
            const responseNow = await axios.request({
                method: "GET",
                url: "https://movies-tv-shows-database.p.rapidapi.com/",
                params: {
                    year: "2023",
                    page: "1",
                },
                headers: {
                    Type: "get-popular-movies",
                    "X-RapidAPI-Key": import.meta.env.VITE_KEY_1,
                    "X-RapidAPI-Host":
                        "movies-tv-shows-database.p.rapidapi.com",
                },
            });
            // console.log(responseUp.data.movie_results);
            // console.log(responseNow.data.movie_results);
            Object.entries(responseNow.data.movie_results).forEach(
                (element1, id) => {
                    if (id <= 3) {
                        setNow((prev) => [...prev, element1]);
                    }
                }
            );
            Object.entries(responseUp.data.movie_results).forEach(
                (element2, id) => {
                    if (id <= 3) {
                        setUp((prev) => [...prev, element2]);
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        return () => getMovies();
    }, []);
    return (
        <div className="bg-black text-white">
            <NavBar />
            <div className=" w-[94%] m-auto">
                <h1 className="bg-clip-text py-4 mb-5 text-transparent w-fit text-5xl bg-gradient-to-r from-[#06D6A0] to-[#FFD166]">
                    Popular Movies
                </h1>
                <div className="pb-4 flex justify-evenly flex-wrap">
                    {now.map((element, id) => (
                        <MovieCard
                            key={id}
                            token={element[1].imdb_id}
                            title={element[1].title}
                        />
                    ))}
                </div>
            </div>
            <div className=" w-[94%] m-auto">
                <h1 className="bg-clip-text py-4 mb-5 text-transparent w-fit text-5xl bg-gradient-to-r from-[#FFD166] to-[#EF476F]">
                    Upcoming Movies
                </h1>
                <div className="pb-4 flex justify-evenly flex-wrap">
                    {up.map((element, id) => (
                        <MovieCard
                            key={id}
                            token={element[1].imdb_id}
                            title={element[1].title}
                        />
                    ))}
                </div>
            </div>
            <div className=" w-[94%] m-auto pb-12">
                <h1 className="bg-clip-text py-4 mb-5 text-transparent w-fit text-5xl bg-gradient-to-r from-[#EF476F] to-[#06D6A0]">
                    Get Movie Suggestion
                </h1>
                <div className="w-[350px] max-[400px]:w-[280px] flex flex-col justify-center items-center p-5 outline outline-1 outline-white rounded-lg m-auto">
                    <div className="flex flex-col relative  my-4">
                        <label
                            htmlFor="name"
                            className="text-xs text-blue-500 absolute top-1 left-3"
                        >
                            Name
                        </label>
                        <input
                            name="name"
                            className="pt-6 cursor-pointer pb-2 px-8 w-[300px] max-[400px]:w-[250px] text-black focus:outline-none focus:shadow-md focus:shadow-blue-500"
                            type="text"
                            onChange={nameHandler}
                            value={username}
                        />
                    </div>
                    <div className="flex flex-col relative  my-4">
                        <label
                            htmlFor="genre"
                            className="text-xs text-blue-500 absolute top-1 left-3"
                        >
                            Genre
                        </label>
                        <select
                            name="genre"
                            className="pt-6 cursor-pointer pb-2 px-8 w-[300px] max-[400px]:w-[250px] text-black focus:outline-none focus:shadow-md focus:shadow-blue-500"
                            value={genre}
                            onChange={genreHandler}
                        >
                            <option></option>
                            <option value="Action">Action</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Crime">Crime</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                            <option value="Horror">Horror</option>
                        </select>
                    </div>
                    <div className="flex flex-col relative  my-4">
                        <label
                            htmlFor="year"
                            className="text-xs text-blue-500 absolute top-1 left-3"
                        >
                            Year Range
                        </label>
                        <select
                            name="year"
                            className="pt-6 cursor-pointer pb-2 px-8 w-[300px] max-[400px]:w-[250px] text-black focus:outline-none focus:shadow-md focus:shadow-blue-500"
                            value={year}
                            onChange={yearHandler}
                        >
                            <option></option>
                            {years.map((element, id) => (
                                <option key={id} value={element}>
                                    {element}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={getSuggestion}
                        className="px-4 my-4 py-2 rounded-lg bg-gradient-to-b from-red-600 to-yellow-500"
                    >
                        Get Movies
                    </button>
                </div>
            </div>
        </div>
    );
}
