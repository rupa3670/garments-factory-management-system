const InputField = ({
  label,
  icon,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-bold text-[#2b140c] mb-1.5"
      >
        {icon} {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 rounded-xl border-2 border-[#f6dcd6] bg-[#f8ebe8] px-4 text-sm outline-none focus:border-[#7a2e14] focus:bg-white transition"
      />
    </div>
  );
};

export default InputField;