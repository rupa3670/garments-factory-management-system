import Image from "next/image";
import Link from "next/link";

const AuthShell = ({ active = "signup", children }) => {
  const tabBase =
    "absolute right-0 w-[118px] h-[54px] flex items-center justify-center text-sm font-bold tracking-wide transition rounded-l-full";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#f7ebe7]">
      <div className="w-full max-w-4xl grid md:grid-cols-[0.8fr_1.2fr] rounded-3xl overflow-hidden bg-white shadow-[0_30px_60px_-20px_rgba(60,20,10,0.35)]">
        
        {/* Left side image and tabs */}
        <div className="relative hidden md:block min-h-[640px] bg-[#2b140c]">
          <Image
            src="/assets/register.png"
            alt="Illustration"
            fill
            priority
            className="object-contain object-center" 
          />

         
      
      
        </div>

        {/* Right side form content */}
        <div className="px-6 sm:px-12 py-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthShell;