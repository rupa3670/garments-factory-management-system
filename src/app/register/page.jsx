"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaAt, FaUser, FaUserPlus } from "react-icons/fa";
import Link from "next/link";

import AuthShell from "@/components/auth/AuthShell";
import PasswordField from "@/components/auth/PasswordField";
import RoleSelect from "@/components/auth/RoleSelect";
import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "../lib/auth-client";


const DEFAULT_AVATAR = "/assets/avatar.png";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password)
    );
  };

  const uploadImage = async () => {
    if (!imageFile) return DEFAULT_AVATAR;

    const form = new FormData();
    form.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: form }
      );
      const data = await res.json();
      return data?.data?.url || DEFAULT_AVATAR;
    } catch {
      return DEFAULT_AVATAR;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters, include one uppercase and one lowercase letter."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage();

      const { data, error: signUpError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: imageUrl,
        role: formData.role,
      });

      if (signUpError) {
        setError(signUpError.message || "Something went wrong.");
        return;
      }

      if (data) {
        await authClient.signOut();
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast.info("Google sign up is coming soon.");
  };

  return (
    <AuthShell active="signup">
      <div className="max-w-sm mx-auto py-1">
        
       
        <div className="flex flex-col items-center mb-3">
          {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a07060] to-[#4a2418] flex items-center justify-center shadow-sm shadow-[#7a2e14]/20 mb-1.5">
            <FaUserPlus className="text-white text-lg" />
          </div> */}
          <h1 className="text-lg font-extrabold text-[#2b140c] tracking-wide">
            Welcome! Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          
    
          <div className="flex flex-col items-center gap-1">
            <label className="relative cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#a07060] to-[#4a2418] shadow-sm shadow-[#7a2e14]/20">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : formData.name?.trim() ? (
                  <span className="text-white text-base font-bold">
                    {formData.name.trim().charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <FaUserPlus className="text-white text-base" />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <span className="text-[10px] text-[#7a5a50]">Upload photo (optional)</span>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#2b140c] mb-1">
              <FaUser size={11} /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full h-10 rounded-xl border border-[#f6dcd6] bg-[#f8ebe8] px-3 text-xs outline-none focus:border-[#7a2e14] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#2b140c] mb-1">
              <FaAt size={11} /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="w-full h-10 rounded-xl border border-[#f6dcd6] bg-[#f8ebe8] px-3 text-xs outline-none focus:border-[#7a2e14] focus:bg-white transition"
            />
          </div>

          <RoleSelect value={formData.role} onChange={handleChange} />

          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
          <p className="text-[10px] text-gray-400 -mt-1">
            Min 8 chars, one uppercase & one lowercase letter
          </p>

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
          />

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <div className="flex justify-center pt-1">
            <button
              type="submit"
              disabled={loading}
              className="px-10 h-10 rounded-full bg-[#7a2e14] text-white text-xs font-bold tracking-wide shadow-md shadow-[#7a2e14]/30 hover:bg-[#62240f] disabled:opacity-60 transition"
            >
              {loading ? "Creating..." : "SIGN UP"}
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 my-2.5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <GoogleButton onClick={handleGoogleSignUp} />

        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7a2e14] font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}