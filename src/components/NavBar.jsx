import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const queryHandler = (e) => {
        setQuery(e.target.value);
    };
    return (
        <div className="w-[90%] m-auto py-4 z-40 flex flex-wrap justify-between">
            <img
                className="w-[100px]"
                src="/logo.png"
                alt=""
                onClick={() => navigate("/")}
            />
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    className="py-2 px-4 h-[50px] bg-clip-text text-transparent cursor-text bg-gradient-to-r from-[#06D6A0] to-[#FFD166] border-b border-gray-100 focus:outline-none"
                    placeholder="Search"
                    onChange={queryHandler}
                    value={query}
                />
                <img
                    className="w-[20px] ml-4 h-[20px] cursor-pointer"
                    src="./search.png"
                    alt=""
                    onClick={() =>
                        navigate("/search", { state: { query: query } })
                    }
                />
            </div>
        </div>
    );
}
