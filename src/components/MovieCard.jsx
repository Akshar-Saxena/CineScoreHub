import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard(props) {
    // const [src, setSrc] = useState("");
    const navigate = useNavigate();
    const movieRedirect = () => {
        // console.log(props.token);
        navigate("/details", { state: { token: props.token } });
    };
    // const getImage = async () => {
    //     const res = await axios.get(
    //         `https://www.omdbapi.com/?i=${props.token}&apikey=893d135d`
    //     );
    //     console.log(res.data.Poster);
    //     setSrc(res.data.Poster);
    // };
    // useEffect(() => {
    //     return () => getImage();
    // }, []);
    return (
        <div
            onClick={movieRedirect}
            className="flex cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500 hover:-translate-x-2 hover:-translate-y-2 flex-col mb-8 justify-center w-fit items-center outline outline-1 outline-white"
        >
            <img
                className="w-[250px] h-[350px] text-white"
                src="https://m.media-amazon.com/images/M/MV5BZDIwNTU0MDctNjg3Ny00M2M0LWJjMTktNDRiOTkyMzU1YTRjXkEyXkFqcGdeQXVyNjUwMjYwMjE@._V1_SX300.jpg"
                alt="No Image"
            />
            <h1 className="text-lg py-2 w-[250px] text-center">
                {props.title}
            </h1>
        </div>
    );
}
