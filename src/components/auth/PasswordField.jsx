"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordField = ({ label, name, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-bold text-[#2b140c] mb-1.5"
      >
        <FaLock size={13} /> {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full h-12 rounded-xl border-2 border-[#f6dcd6] bg-white px-4 pr-11 text-sm outline-none focus:border-[#7a2e14] transition"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7a2e14]"
        >
          {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;