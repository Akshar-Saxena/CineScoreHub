import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function MovieDetailsPage() {
    const location = useLocation();
    const [src, setSrc] = useState();
    const [resp, setResp] = useState();
    const [key, setKey] = useState(false);
    const [ready, setReady] = useState(false);
    const [stars, setStars] = useState([]);
    const getData = async () => {
        const options = {
            method: "GET",
            url: "https://movies-tv-shows-database.p.rapidapi.com/",
            params: {
                movieid: location.state.token,
            },
            headers: {
                Type: "get-movie-details",
                "X-RapidAPI-Key":
                    "e60d81a09emsh298c2129fcfed33p17cca3jsn3969ee95a884",
                "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            // console.log(response.data);
            setResp(response.data);
            const res = await axios.get(
                `https://www.omdbapi.com/?i=${location.state.token}&apikey=893d135d`
            );
            // console.log(res.data.Poster);
            if (res.data.Poster == "N/A") {
                // console.log("No Image");
                setSrc(
                    "https://www.rockettstgeorge.co.uk/cdn/shop/products/no_selection_46a68bcd-4f07-453a-bd6f-b50da3d486d0.jpg?v=1683702587"
                );
            } else {
                setSrc(encodeURI(res.data.Poster));
            }
            setReady(true);
        } catch (error) {
            // console.error(error);
        }
    };

    const calcTime = (seconds) => {
        const hours = Math.floor(seconds / 60);
        const minutes = seconds % 60;
        return `${hours} hrs ${minutes} min`;
    };
    const giveGenre = (l) => {
        let st = "";
        l.forEach((element, id) => {
            // console.log(element, id);
            if (id != l.length - 1) {
                st += element + ",";
            } else {
                st += element;
            }
        });
        return st;
    };
    useEffect(() => {
        try {
            if (location.state.token) {
                setKey(true);
                // setReady(true);
                getData();
            }
        } catch (e) {
            null;
        }
    }, []);
    return (
        <div>
            {key == true ? (
                ready == true ? (
                    <div className="bg-black">
                        <NavBar />
                        <div
                            className={`relative bg-no-repeat bg-cover`}
                            style={{
                                background: `url(${src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="bg-[#000000e1] w-full h-full absolute top-0 z-10"></div>
                            <div className="relative top-0 z-20 flex flex-wrap justify-evenly items-center pt-20">
                                <img
                                    className="w-[300px] text-white"
                                    src={src}
                                    alt="No Image"
                                />
                                <div className="text-white max-[450px]:w-[80%] w-[50%]">
                                    <h1 className="text-4xl text-[#FFD166]">
                                        Movie Name :{" "}
                                        <span className="text-white">
                                            {resp.title}
                                        </span>
                                    </h1>
                                    <h2 className="text-[#EF476F]">
                                        Year:{" "}
                                        <span className="text-white">
                                            {resp.year}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#06D6A0]">
                                        Tagline:{" "}
                                        <span className="text-white">
                                            {resp.tagline == null
                                                ? "-"
                                                : resp.tagline}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#FFD166]">
                                        Description:{" "}
                                        <span className="text-white">
                                            {resp.description == null
                                                ? "-"
                                                : resp.description}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#EF476F]">
                                        Rated:{" "}
                                        <span className="text-white">
                                            {resp.rated == null
                                                ? "-"
                                                : resp.rated}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#06D6A0]">
                                        Runtime:{" "}
                                        <span className="text-white">
                                            {calcTime(resp.runtime)}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#FFD166]">
                                        Genre:{" "}
                                        <span className="text-white">
                                            {resp.genres != null
                                                ? giveGenre(resp.genres)
                                                : "-"}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#EF476F]">
                                        Release Date:{" "}
                                        <span className="text-white">
                                            {resp.release_date == null
                                                ? "-"
                                                : resp.release_date}
                                        </span>
                                    </h2>
                                    <h2 className="text-[#06D6A0]">
                                        Directed by:{" "}
                                        <span className="text-white">
                                            {resp.genres != null
                                                ? giveGenre(resp.directors)
                                                : "-"}
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <div className="text-white mt-14 relative z-30 w-[80%] m-auto pb-20">
                                <h1 className="text-5xl text-transparent bg-clip-text w-fit bg-gradient-to-r from-[#06D6A0] to-[#EF476F]">
                                    Stars
                                </h1>
                                <ol className="list-decimal ml-10 mt-6">
                                    {resp.stars != null ? (
                                        resp.stars.map((star, id) => (
                                            <li key={id}>{star}</li>
                                        ))
                                    ) : (
                                        <li> Star Details Not Available</li>
                                    )}
                                </ol>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-screen flex justify-center items-center">
                        <RingLoader color="black" loading={true} size={200} />
                    </div>
                )
            ) : (
                <div className="w-full h-screen flex justify-center items-center">
                    <div className="w-[50%] flex flex-col justify-center items-center">
                        <img src="/error.png" alt="" />
                        <h1 className="font-bold text-4xl text-center">
                            Page Not Found
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}
