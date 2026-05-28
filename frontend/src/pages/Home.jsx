import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-[#EFF3FD] via-[#F4F7FF] to-[#E9EDF8] text-slate-800 overflow-hidden pb-16">
      {/* Premium Dreamy Pastel Fluid Multi-Shade Gradient Blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-[#C5CDFA]/40 via-[#D6DCFA]/50 to-[#FDE8E5]/30 rounded-full filter blur-3xl opacity-90 animate-float-slow"></div>
      <div className="absolute left-[15%] top-[5%] w-[45rem] h-[45rem] bg-gradient-to-br from-[#E2DBFA]/50 via-[#E8E2FA]/50 to-[#D5EDFC]/40 rounded-full filter blur-3xl opacity-85 animate-float"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#D5EDFC]/40 via-[#E8E2FA]/40 to-[#C5CDFA]/30 rounded-full filter blur-3xl opacity-75 animate-float-reverse"></div>

      <div className="relative z-10 pt-20">
        {/* Hero Section - Split Screen Layout matching mockup screenshot exactly */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Title & Text */}
            <div className="text-left animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Accelerate Your <br />
                Career with <span className="text-[#7C3AED]">AI</span> <br />
                <span className="text-[#7C3AED]">Precision</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-normal">
                Unlock your potential with real-time resume optimization and intelligent job matching.
              </p>

              <div className="flex gap-4 items-center flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      className="px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20 transition duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Get Started for Free
                    </button>
                    <button
                      onClick={() => navigate("/about")}
                      className="px-8 py-4 bg-white/40 border-2 border-[#7C3AED]/40 text-[#7C3AED] hover:bg-[#7C3AED]/10 font-bold rounded-2xl transition duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Watch Demo
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/features")}
                    className="px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20 transition duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Explore Dashboard
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: 3D Isometric UI Illustration */}
            <div className="w-full flex justify-center animate-fade-in-up delay-200">
              <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/60 hover:scale-[1.02] transition-all duration-500 bg-white/10 backdrop-blur-sm">
                <img
                  src="/dashboard_3d.png"
                  alt="CareerCraft AI Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white/30 border-y border-white/40 backdrop-blur-lg relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#7C3AED] text-xs font-bold uppercase tracking-widest bg-purple-100 px-3 py-1.5 rounded-full border border-purple-200/50">Features Overview</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
                Why <span className="font-cormorant font-black text-slate-900 italic tracking-wide">CareerCraft <span className="text-[#2563EB]">AI</span></span>?
              </h2>
              <p className="text-slate-550 text-sm md:text-base max-w-xl mx-auto">
                A simple, robust framework built to align resumes with recruiter expectations and surface the right listings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "ATS-Friendly", desc: "Convert rich resume layouts into clean, structural data easily scanned by recruitment engines." },
                { title: "Time Saver", desc: "Stop manual bullet editing. Generate optimized keyword match adjustments instantly." },
                { title: "Career Insights", desc: "Obtain clean feedback regarding skill gaps, keyword densities, and formatting fixes." },
                { title: "Smart Matcher", desc: "Evaluate your resume alongside live descriptions to calculate an ATS alignment score." },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 bg-white/60 border border-white/70 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-md hover:border-purple-250 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[#7C3AED] bg-purple-50 border border-purple-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full block mb-4 w-fit">Feature 0{i + 1}</span>
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Subtle decorative blurred circles for depth */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 text-center relative">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full border border-blue-200/50 shadow-sm select-none">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-4 tracking-tight font-cormorant">
              How <span className="font-black">CareerCraft <span className="text-[#2563EB] italic font-bold">AI</span></span> Works
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto mb-16 leading-relaxed">
              Optimize your profile and match top industry standards in less than two minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection line in desktop */}
              <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 -z-10 transform -translate-y-1/2" />

              {[
                {
                  step: "01",
                  title: "Upload Resume",
                  desc: "Drag & drop your existing resume. Our intelligent system instantly parses your current professional skills.",
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  )
                },
                {
                  step: "02",
                  title: "Paste Job Description",
                  desc: "Copy-paste the job description details for any role you are targeted to apply for.",
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  )
                },
                {
                  step: "03",
                  title: "Match & Enhance",
                  desc: "Get an instant semantic compatibility score and live keyword suggestions to easily land high-paying interviews.",
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.813L21 9l-4.813-1.187L9.813 15.904zM9.813 15.904L6 14m0 0l3-3.5L6 7m0 7h6.5" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-white/70 border border-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:border-blue-200 hover:bg-white/90 transition duration-300 text-left flex flex-col items-start"
                >
                  {/* Step Number Bubble */}
                  <div className="w-10 h-10 bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-black text-sm rounded-2xl flex items-center justify-center shadow-md absolute -top-4 -left-4 group-hover:scale-110 transition duration-300">
                    {item.step}
                  </div>

                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center mb-6 shadow-md shadow-blue-500/10 group-hover:rotate-6 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#2563EB] transition duration-150">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white/30 border-y border-white/40 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 tracking-tight">Our Core Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: "500+", label: "Resumes Optimized" },
                { value: "300+", label: "Successful Matches" },
                { value: "99.2%", label: "Platform Accuracy" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-8 bg-white/70 border border-white/80 rounded-3xl hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-slate-655 font-medium text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 relative overflow-hidden bg-white/20 border-b border-white/35 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200/50">Our Vision</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-6 tracking-tight">
              About <span className="font-cormorant font-black text-slate-950 italic tracking-wide">CareerCraft <span className="text-[#2563EB]">AI</span></span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-16">
              <span className="font-cormorant font-black text-slate-955 italic tracking-wide">CareerCraft <span className="text-[#2563EB]">AI</span></span> is an engineering project conceptualized to bridge the core gaps in modern technical hiring. From direct semantic parsing of resumes to analyzing real-time ATS match compliance, our platform delivers actionable intelligence that helps you land your next engineering challenge.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Our Foundation", desc: "Designed in 2025 as a premium full-stack system linking modern REST APIs with large language processing algorithms." },
                { title: "Core Values", desc: "Simplicity in engineering, security in user data, and high fidelity in career insights." },
                { title: "The Road Ahead", desc: "Integrating smart automated cover letters, semantic profile matching, and unified job applications." },
              ].map((info, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/60 border border-white/70 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-sm font-bold text-[#7C3AED] mb-2 uppercase tracking-wide">
                    {info.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section (Stunning deep purple gradient card matching layout) */}
        <section className="py-20 max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] border border-purple-600/35 rounded-3xl p-12 text-center shadow-2xl hover:shadow-[0_15px_40px_rgba(124,58,237,0.2)] transition duration-300 relative overflow-hidden">
            {/* Background design elements inside the CTA */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-400/15 rounded-full blur-2xl"></div>

            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight relative z-10">
              Ready to Accelerate Your Career Flow?
            </h2>
            <p className="text-purple-100 text-sm max-w-md mx-auto mb-8 leading-relaxed relative z-10">
              Create a free account, upload your primary resume, and start analyzing matching criteria in under 60 seconds.
            </p>
            {!isAuthenticated ? (
              <div className="flex justify-center gap-4 flex-wrap relative z-10">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-3.5 bg-white text-[#7C3AED] font-bold rounded-xl shadow-lg hover:bg-slate-100 transition transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-3.5 bg-[#4C1D95]/60 border border-purple-400/30 text-white font-bold rounded-xl hover:bg-[#4C1D95] transition transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                >
                  Register Free
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/features")}
                className="px-8 py-3.5 bg-white text-[#7C3AED] font-bold rounded-xl shadow-lg hover:bg-slate-100 transition transform hover:-translate-y-0.5 duration-200 relative z-10 cursor-pointer"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
