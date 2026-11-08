"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaAt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import InputField from "@/components/auth/InputField";
import PasswordField from "@/components/auth/PasswordField";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      const { data, error: loginError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) {
        setError(loginError.message || "Invalid email or password.");
        return;
      }

      if (data) {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login is coming soon.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#f7ebe7]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_30px_60px_-20px_rgba(60,20,10,0.35)] px-6 sm:px-10 py-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-xl font-extrabold text-[#2b140c] tracking-wide">
            WELCOME BACK
          </h1>
          <p className="text-xs text-gray-500 mt-1">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email Field */}
          <InputField
            label="Email Address"
            icon={<FaAt size={11} />}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />

          {/* Password Field Component Call */}
          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-10 h-10 rounded-full bg-[#7a2e14] text-white text-xs font-bold tracking-wide shadow-md shadow-[#7a2e14]/30 hover:bg-[#62240f] disabled:opacity-60 transition"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-10 rounded-xl bg-[#efedee] text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 opacity-70 cursor-not-allowed"
        >
          <FcGoogle size={18} /> Google
        </button>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#7a2e14] font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}