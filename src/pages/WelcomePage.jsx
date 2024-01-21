import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import nowPlaying from "../constants/nowPlayingMovies.json";
import upcomingMovies from "../constants/upcomingMovies.json";

export default function WelcomePage() {
    const [now, setNow] = useState([]);
    const [up, setUp] = useState([]);
    useEffect(() => {
        Object.entries(nowPlaying.movie_results).forEach((element, id) => {
            if (id <= 3) {
                setNow((prev) => [...prev, element]);
            }
        });
        Object.entries(upcomingMovies.movie_results).forEach((element, id) => {
            if (id <= 3) {
                setUp((prev) => [...prev, element]);
            }
        });
    }, []);
    return (
        <div className="bg-black text-white">
            <NavBar />
            <div className=" w-[94%] m-auto">
                <h1 className="bg-clip-text py-4 mb-5 text-transparent w-fit text-5xl bg-gradient-to-r from-[#06D6A0] to-[#FFD166]">
                    Now Playing
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
                <div className="w-[350px] flex flex-col justify-center items-center p-5 outline outline-1 outline-white rounded-lg m-auto">
                    <div className="flex flex-col relative  my-4">
                        <label
                            htmlFor="name"
                            className="text-xs text-blue-500 absolute top-1 left-3"
                        >
                            Name
                        </label>
                        <input
                            name="name"
                            className="pt-6 cursor-pointer pb-2 px-8 w-[300px] text-black focus:outline-none focus:shadow-md focus:shadow-blue-500"
                            type="text"
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
                            className="pt-6 cursor-pointer pb-2 px-8 w-[300px] text-black focus:outline-none focus:shadow-md focus:shadow-blue-500"
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
                            className="pt-6 cursor-pointer pb-2 px-8 w-[300px] text-black focus:outline-none focus:shadow-md focus:shadow-blue-500"
                        >
                            <option></option>
                            <option value="0">2023-2020</option>
                            <option value="1">2019-2015</option>
                            <option value="2">2014-2010</option>
                            <option value="3">2009-2005</option>
                            <option value="4">2004-2000</option>
                            <option value="5">1999-1990</option>
                        </select>
                    </div>
                    <button className="px-4 my-4 py-2 rounded-lg bg-gradient-to-b from-red-600 to-yellow-500">
                        Get Movies
                    </button>
                </div>
            </div>
        </div>
    );
}
