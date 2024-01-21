import React from "react";
import { useNavigate } from "react-router-dom";
// import { IonInput, IonItem, IonList } from "@ionic/react";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="bg-[url('/bg.png')] flex justify-center items-center h-screen bg-center w-full bg-contain">
            <div className="flex flex-col justify-center items-center">
                <img src="/heading.png" alt="" className="w-[60%]" />
                <button
                    onClick={() => navigate("/welcome")}
                    className="bg-[#313131] flex justify-center w-[16%]  p-4 rounded-xl shadow-md mt-10 hover:shadow-lg hover:shadow-[#CF6F00] shadow-[#CF6F00]"
                >
                    <img src="/button.png" alt="" />
                </button>
            </div>
        </div>
    );
}
