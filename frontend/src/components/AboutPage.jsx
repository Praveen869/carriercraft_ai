import React from "react";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const journey = [
  {
    year: "Phase 1: Concept",
    title: "Identifying the ATS Gap",
    text: "Praveen envisioned a smart career platform to help job seekers bypass rigid Applicant Tracking Systems through transparent resume optimization."
  },
  {
    year: "Phase 2: Engineering",
    title: "AI Semantic Extraction",
    text: "Developed robust parsers that extract and map key skills semantically using state-of-the-art LLMs via the Groq SDK."
  },
  {
    year: "Phase 3: Integration",
    title: "Real-Time Job Matching",
    text: "Integrated live job search with real-time keyword suggestions, bridging the gap between candidates and descriptions."
  },
  {
    year: "Future Vision",
    title: "Career Automation Suite",
    text: "Expanding into automated cover letter drafting, real-time mock interviews, and direct one-click application pipelines."
  },
];

const AboutPage = () => {
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EFF3FD] via-[#F4F7FF] to-[#E9EDF8] text-slate-800 px-6 md:px-12 py-16 overflow-hidden">
      {/* Premium Dreamy Pastel Fluid Multi-Shade Gradient Blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-[#C5CDFA]/40 via-[#D6DCFA]/50 to-[#FDE8E5]/30 rounded-full filter blur-3xl opacity-90 animate-float-slow"></div>
      <div className="absolute left-[15%] top-[5%] w-[45rem] h-[45rem] bg-gradient-to-br from-[#E2DBFA]/50 via-[#E8E2FA]/50 to-[#D5EDFC]/40 rounded-full filter blur-3xl opacity-85 animate-float"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#D5EDFC]/40 via-[#E8E2FA]/40 to-[#C5CDFA]/30 rounded-full filter blur-3xl opacity-75 animate-float-reverse"></div>

      <div className="relative z-10 pt-24">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            About <span className="font-cormorant font-black text-slate-900 italic tracking-wide text-4xl md:text-6xl">CareerCraft <span className="text-[#2563EB]">AI</span></span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Empowering professionals with AI-driven resume optimization and smart job matching.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="w-56 h-56 md:w-72 md:h-72 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white/40 border border-white/60 p-2 hover:scale-[1.02] transition-transform duration-500">
            <img
              src="/team.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="animate-fade-in-up delay-200">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Our Mission
            </h2>
            <p className="text-slate-650 leading-relaxed mb-6">
              At <span className="font-cormorant font-black text-slate-900 italic tracking-wide text-lg md:text-xl">CareerCraft <span className="text-[#2563EB]">AI</span></span>, we believe your career deserves the best tools. Our mission is to simplify job applications by making resumes ATS-friendly, providing actionable insights, and ensuring you stand out to recruiters.
            </p>
            <div className="p-5 bg-blue-50/50 backdrop-blur-md rounded-2xl border border-blue-200/50 mb-6">
              <p className="text-slate-800 font-bold text-sm">
                Developed & Maintained by <span className="text-[#2563EB] font-black">Praveen Kumar Dwivedi</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 italic">
                "Your dream job is just one optimized resume away."
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Praveen869"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition text-xs font-bold shadow-md transform hover:-translate-y-0.5"
              >
                <FaGithub className="text-base" /> Visit My GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/praveen-dwivedi-5b6219269"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl transition text-xs font-bold shadow-md transform hover:-translate-y-0.5"
              >
                <FaLinkedin className="text-base" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Journey / Timeline */}
        <div className="mt-32 max-w-4xl mx-auto relative px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-slate-900 tracking-tight mb-16">Our Journey</h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#7C3AED]/20"></div>

            <motion.div
              ref={timelineRef}
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.25,
                  },
                },
              }}
              className="space-y-12"
            >
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } },
                  }}
                  className="relative flex flex-col md:flex-row md:items-center justify-between"
                >
                  {/* Left Card (Even indexes show card on left, odd indexes show empty spacer on desktop) */}
                  {i % 2 === 0 ? (
                    <div className="w-full md:w-[45%] bg-white/65 border border-white/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-purple-300 hover:shadow-purple-500/5 duration-300 p-6 transform hover:-translate-y-1">
                      <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">{item.year}</span>
                      <h4 className="font-extrabold text-slate-900 text-lg mt-3">{item.title}</h4>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed">{item.text}</p>
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-[45%]" />
                  )}

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-[3px] border-[#7C3AED] shadow-sm z-10 items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-pulse"></div>
                  </div>

                  {/* Right Card (Odd indexes show card on right, even indexes show empty spacer on desktop) */}
                  {i % 2 !== 0 ? (
                    <div className="w-full md:w-[45%] bg-white/65 border border-white/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-purple-300 hover:shadow-purple-500/5 duration-300 p-6 transform hover:-translate-y-1">
                      <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">{item.year}</span>
                      <h4 className="font-extrabold text-slate-900 text-lg mt-3">{item.title}</h4>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed">{item.text}</p>
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-[45%]" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Technical Architecture & Tech Stack */}
        <div className="mt-32 max-w-6xl mx-auto text-center">
          <span className="text-[#7C3AED] text-xs font-bold uppercase tracking-widest bg-purple-100 px-3 py-1.5 rounded-full border border-purple-200/50">Tech Stack</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">Technical Architecture</h2>
          <p className="text-slate-550 text-sm max-w-2xl mx-auto mb-16 leading-relaxed">
            CareerCraft AI is built using a modern, scalable full-stack architecture designed to handle high-performance parsing and real-time semantic analysis.
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Card */}
            <div className="bg-white/65 border border-white/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-300 duration-300 p-8 flex flex-col items-center text-center transform hover:-translate-y-1.5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center text-3xl mb-4 border border-purple-100">
                <FaReact />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Frontend Client</h3>
              <p className="text-[#7C3AED] text-xs font-bold mb-4 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100/50">React 19 • Vite • Tailwind • Motion</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                A highly interactive, responsive interface loaded with micro-animations, real-time input validations, and custom hooks for secure state handling.
              </p>
            </div>

            {/* Backend Card */}
            <div className="bg-white/65 border border-white/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-300 duration-300 p-8 flex flex-col items-center text-center transform hover:-translate-y-1.5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center text-3xl mb-4 border border-purple-100">
                <FaNodeJs />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Backend REST API</h3>
              <p className="text-[#7C3AED] text-xs font-bold mb-4 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100/50">Node.js • Express • JWT • Multer</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                A robust RESTful API handling secure JWT user authentication, file uploads, PDF/Docx text parsing pipelines, and optimized routing middlewares.
              </p>
            </div>

            {/* AI & Database Card */}
            <div className="bg-white/65 border border-white/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-300 duration-300 p-8 flex flex-col items-center text-center transform hover:-translate-y-1.5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center text-3xl mb-4 border border-purple-100">
                <FaDatabase />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Data & AI Engine</h3>
              <p className="text-[#7C3AED] text-xs font-bold mb-4 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100/50">MongoDB • Groq SDK • Jooble API</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Database storage powered by MongoDB Atlas. Smart ATS resume scoring driven by Llama models via Groq API, and jobs fetched live using Jooble integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
