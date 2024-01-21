import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { IonInput, IonItem, IonList } from "@ionic/react";

export default function HomePage() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handle = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handle);

        return () => {
            window.removeEventListener("resize", handle);
        };
    }, []);
    const navigate = useNavigate();
    return (
        <div className="bg-[url('/bg.png')] max-[550px]:bg-[url('/bg-small.png')] flex justify-center items-center h-screen bg-center w-full bg-contain max-[680px]:bg-contain">
            <div className="flex flex-col justify-center items-center">
                <img
                    src={width > 500 ? "/heading.png" : "/heading-small.png"}
                    alt=""
                    className="w-[60%]"
                />
                <button
                    onClick={() => navigate("/welcome")}
                    className="bg-[#313131] flex justify-center w-[150px] max-[500px]:w-[100px]  p-4 rounded-xl shadow-md mt-10 hover:shadow-lg hover:shadow-[#CF6F00] shadow-[#CF6F00]"
                >
                    <img src="/button.png" alt="" />
                </button>
            </div>
        </div>
    );
}
