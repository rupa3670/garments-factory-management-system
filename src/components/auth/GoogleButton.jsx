"use client";
import { FcGoogle } from "react-icons/fc";


const GoogleButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 rounded-xl bg-[#efedee] text-sm font-semibold text-gray-700 flex items-center justify-center gap-2 opacity-70 cursor-not-allowed"
    >
      <FcGoogle size={22} /> Google
    </button>
  );
};

export default GoogleButton;