"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordField = ({ label = "Password", name = "password", value, onChange, placeholder = "Enter password", required = true }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-xs font-bold text-[#2b140c] mb-1"
      >
        <FaLock size={11} /> {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-10 rounded-xl border border-[#f6dcd6] bg-white px-3 pr-10 text-xs outline-none focus:border-[#7a2e14] transition"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7a2e14]"
        >
          {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;