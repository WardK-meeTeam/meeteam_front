"use client";

import { FaCheck } from "react-icons/fa6";

interface ToggleSwitchButtonProps {
    isSelected: boolean;
    onClick: () => void;
};

export default function ToggleSwitchButton({isSelected, onClick,} : ToggleSwitchButtonProps) {

    const bgColor = isSelected ? "bg-[#3395F9]" : "bg-[#D9D9D9]";
    const color = isSelected ? "text-[#3395F9]" : "text-white";

    return (
       <div 
       onClick={onClick} 
       className={`flex items-center w-[56px] h-[28px] rounded-[17.5px] cursor-pointer ${bgColor}`}
       >
        <div 
        onClick={onClick}
        className={`w-[20px] h-[20px] rounded-[50%] bg-white flex justify-center items-center mx-1 transform transition-transform duration-400 ease-in-out ${isSelected ? "translate-x-[28px]" : "translate-x-0"}`}
        >
            <FaCheck onClick={onClick} className={`w-[12px] h-[12px] ${color}`} />
        </div>
       </div>
    )
};