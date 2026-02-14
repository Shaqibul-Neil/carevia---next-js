import RegisterForm from "@/components/form/RegisterForm";
import Link from "next/link";
import Image from "next/image";
import { GiHeartInside } from "react-icons/gi";
import GoogleLogin from "@/components/shared/Social Login/GoogleLogin";

export const metadata = {
  title: "Register",
  description: "Care That Comes Home",
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-2 py-4 md:px-4 font-sans overflow-y-auto relative">
      {/* Two-Tone Background */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="w-full h-[30%] bg-[#0F172A] dark:bg-[#0a0f1a]"></div>
        <div className="w-full h-[70%] bg-green-50 dark:bg-slate-800"></div>
      </div>

      {/* Presentation Canvas */}
      <div className="w-full max-w-360 bg-white dark:bg-slate-900 rounded-xs shadow-2xl overflow-hidden min-h-150 h-auto md:min-h-[85vh] py-2 md:py-0 flex flex-col xl:flex-row relative">
        {/* Top Left Bubbles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Big Bubble with Content */}
          <div className="absolute -top-[100px] -left-[60px] w-[420px] h-[420px] rounded-full bg-white dark:bg-slate-800 shadow-[5px_15px_15px_rgba(34,197,94,0.15)] border border-white/50 dark:border-slate-700/50 justify-center items-start pl-20 pt-20 overflow-hidden flex flex-col">
            <div className="relative z-10 scale-90 origin-top-left inset-0">
              <div className="relative pt-8 ml-4 hidden xl:flex flex-col">
                <h2 className="text-5xl font-semibold text-slate-800 dark:text-white mb-1">
                  Give Care
                  <span className="font-bold text-primary"> Give peace</span>
                </h2>

                <div className="w-18 h-1.5 bg-gradient-to-r from-primary to-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Small Bubble */}
          <div className="absolute -top-[100px] left-[180px] w-[220px] h-[220px] rounded-full bg-white dark:bg-slate-800 shadow-[1px_15px_15px_rgba(34,197,94,0.10)] border border-white/60 dark:border-slate-700/60"></div>
        </div>

        {/* Left Side - Presentation Typography */}
        <div className="hidden xl:flex xl:w-[35%] p-12 flex-col justify-center relative z-0 overflow-hidden">
          <div className="relative z-10 mt-[350px]">
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm pl-4 border-l-4 border-primary/30 italic">
              "A premium caregiving platform connecting families with trusted
              caregivers. Join our community and give your loved ones the care
              they deserve."
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full xl:w-[65%] relative flex items-center justify-center p-6 md:p-12 bg-slate-50/50 dark:bg-slate-800/50 xl:bg-transparent">
          {/* The Main Split Card */}
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[30px] shadow-2xl flex flex-col md:flex-row overflow-visible relative z-10 transition-transform duration-500 h-auto md:min-h-[600px]">
            {/* Floating Middle Card */}
            <div className="hidden lg:flex absolute -left-16 lg:-left-10 xl:-left-24 top-[50%] -translate-y-1/2 z-30 w-[280px] h-[460px] bg-gradient-to-b from-primary via-emerald-600 to-[#0a2e1f] rounded-xs shadow-[0_20px_60px_-10px_rgba(34,197,94,0.5)] flex-col justify-center items-center overflow-hidden transform hover:-translate-y-[calc(50%+10px)] transition-transform duration-500">
              {/* Background Ambient Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.2),transparent)] opacity-40 pointer-events-none"></div>

              {/* Central Visual Cluster */}
              <div className="relative z-10 flex flex-col items-center justify-center mt-8">
                {/* Main Icon Holder with Radiating Ripples */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-10">
                  {/* Radiating Ripples */}
                  <span className="absolute inset-0 z-0 flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                    <span className="absolute inline-flex h-[140%] w-[140%] rounded-full bg-emerald-400 opacity-10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_400ms]"></span>
                    <span className="absolute inline-flex h-[180%] w-[180%] rounded-full bg-emerald-400 opacity-5 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_800ms]"></span>
                  </span>

                  {/* The Glass Icon Container */}
                  <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.2)] flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <GiHeartInside className="w-14 h-14 text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]" />
                  </div>
                </div>

                {/* Text Overlay */}
                <div className="text-center px-6 relative z-10">
                  <h4 className="text-3xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
                    Every Care
                    <br />
                    Counts
                  </h4>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-4 rounded-full"></div>
                  <p className="text-emerald-100/90 text-sm font-medium leading-relaxed">
                    "Your care is the
                    <br />
                    gift of peace."
                  </p>

                  <div className="mt-8 relative group">
                    {/* Drop Composition */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-40 h-32 pointer-events-none flex items-center justify-center">
                      {/* Center Heart */}
                      <GiHeartInside className="w-24 h-24 text-emerald-500/10 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] absolute transition-transform duration-700 group-hover:scale-110" />
                      {/* Left Heart */}
                      <GiHeartInside className="w-10 h-10 text-white/5 absolute -left-4 -top-2 -rotate-15 blur-[0.5px] transition-all duration-500 group-hover:-translate-x-4 group-hover:-rotate-25 opacity-60" />
                      {/* Right Heart */}
                      <GiHeartInside className="w-10 h-10 text-white/5 absolute -right-4 -top-2 rotate-15 blur-[0.5px] transition-all duration-500 group-hover:translate-x-4 group-hover:rotate-25 opacity-60" />
                    </div>

                    <button className="relative z-10 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase text-white transition-all shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95">
                      Be A Caregiver
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Decor */}
              <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Main Card Left Image */}
            <div className="md:w-[35%] relative bg-slate-900 group overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none h-[280px] md:h-auto md:min-h-full flex flex-col justify-between p-8 md:p-12">
              {/* Background Layers */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] group-hover:scale-105 opacity-60"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop')",
                  }}
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-emerald-950/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/50 to-transparent"></div>
              </div>

              {/* Top: Branding & Tag */}
              <div className="relative z-20 flex flex-col justify-between items-start space-y-4 lg:space-y-0 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 text-white">
                    <GiHeartInside className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold leading-none tracking-wide text-sm">
                      Carevia.
                    </h3>
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wider uppercase mt-1">
                      The Flow of Care
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                    Live System
                  </span>
                </div>
              </div>

              {/* Right Squares */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex md:flex-col gap-4">
                {/* Square: Caregivers */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 w-28 h-28 rounded-xs shadow-lg flex flex-col items-center justify-center p-3 text-center transform hover:scale-105 transition-all duration-300">
                  <div className="flex -space-x-1.5 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full border border-slate-900 object-cover"
                      alt="Caregiver"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full border border-slate-900 object-cover"
                      alt="Caregiver"
                    />
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-900 flex items-center justify-center text-[8px] text-white font-bold">
                      +5
                    </div>
                  </div>
                  <p className="text-white text-[10px] font-bold leading-tight">
                    New Caregivers
                  </p>
                  <p className="text-slate-400 text-[9px] font-medium mt-0.5">
                    Joined Today
                  </p>
                </div>
              </div>
            </div>

            {/* Main Card Right - Form */}
            <div className="md:w-[65%] p-4 md:p-8 lg:p-12 bg-white dark:bg-slate-900 rounded-b-xl md:rounded-r-xl md:rounded-bl-none flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Join <span className="text-primary">Carevia.</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  Create your account to get started.
                </p>
              </div>

              {/* Register Form — DO NOT MODIFY */}
              <RegisterForm />

              {/* Or Continue With */}
              <div className="mt-6">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    <span className="bg-white dark:bg-slate-900 px-3">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <GoogleLogin />
                </div>
              </div>

              <p className="text-center mt-8 text-xs font-medium text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
