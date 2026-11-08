import { FaUserTie } from "react-icons/fa";

const ROLES = [
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
  { value: "store_keeper", label: "Store Keeper" },
  { value: "accountant", label: "Accountant" },
  { value: "quality_controller", label: "Quality Controller" },
];

const RoleSelect = ({ value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="role"
        className="flex items-center gap-2 text-sm font-bold text-[#2b140c] mb-1.5"
      >
        <FaUserTie size={13} /> Role
      </label>
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        className="w-full h-12 rounded-xl border-2 border-[#f6dcd6] bg-white px-4 text-sm outline-none focus:border-[#7a2e14] transition"
      >
        {ROLES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelect;