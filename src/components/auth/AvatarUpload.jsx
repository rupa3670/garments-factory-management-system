"use client";
import { FaUserPlus } from "react-icons/fa";

const AvatarUpload = ({ preview, name, onChange }) => {
  const initial = name?.trim() ? name.trim().charAt(0).toUpperCase() : "";

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="relative cursor-pointer">
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#a07060] to-[#4a2418] shadow-lg shadow-[#7a2e14]/30">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : initial ? (
            <span className="text-white text-3xl font-bold">{initial}</span>
          ) : (
            <FaUserPlus className="text-white text-3xl" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
      <span className="text-xs text-[#7a5a50]">Upload profile photo</span>
    </div>
  );
};

export default AvatarUpload;