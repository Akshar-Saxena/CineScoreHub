import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard(props) {
    const [src, setSrc] = useState("");
    const navigate = useNavigate();
    const movieRedirect = () => {
        // console.log(props.token);
        navigate("/details", { state: { token: props.token } });
    };
    const getImage = async () => {
        const res = await axios.get(
            `https://www.omdbapi.com/?i=${props.token}&apikey=893d135d`
        );
        // console.log(res.data.Poster);
        if (res.data.Poster == null) {
            setSrc(
                "https://www.rockettstgeorge.co.uk/cdn/shop/products/no_selection_46a68bcd-4f07-453a-bd6f-b50da3d486d0.jpg?v=1683702587"
            );
        } else {
            setSrc(res.data.Poster);
        }
    };
    useEffect(() => {
        getImage();
    }, []);
    return (
        <div
            onClick={movieRedirect}
            className="flex cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500 hover:-translate-x-2 hover:-translate-y-2 flex-col mb-8 justify-center w-fit items-center outline outline-1 outline-white m-3"
        >
            <img
                className="w-[250px] h-[350px] text-white"
                src={src}
                alt="No Image"
            />
            <h1 className="text-lg py-2 text-white w-[250px] text-center">
                {props.title}
            </h1>
        </div>
    );
}
