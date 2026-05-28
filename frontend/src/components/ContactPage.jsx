import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_7481oww", // Praveen's service ID
        "template_mk2rky5", // Praveen's template ID
        formData,
        "ug8lEBaAh__Bu8Abz" // Praveen's public key
      );
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSuccess("Failed to send message. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EFF3FD] via-[#F4F7FF] to-[#E9EDF8] text-slate-800 px-6 md:px-12 py-16 overflow-hidden">
      {/* Premium Dreamy Pastel Fluid Multi-Shade Gradient Blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-[#C5CDFA]/40 via-[#D6DCFA]/50 to-[#FDE8E5]/30 rounded-full filter blur-3xl opacity-90 animate-float-slow"></div>
      <div className="absolute left-[15%] top-[5%] w-[45rem] h-[45rem] bg-gradient-to-br from-[#E2DBFA]/50 via-[#E8E2FA]/50 to-[#D5EDFC]/40 rounded-full filter blur-3xl opacity-85 animate-float"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#D5EDFC]/40 via-[#E8E2FA]/40 to-[#C5CDFA]/30 rounded-full filter blur-3xl opacity-75 animate-float-reverse"></div>

      <div className="relative z-10 max-w-4xl mx-auto pt-24">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Contact <span className="bg-gradient-to-r from-[#2563EB] to-blue-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Questions, feedback, or custom integrations? Send us a message below.
          </p>
        </div>

        <div className="bg-white/60 border border-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-4 bg-white/80 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-4 bg-white/80 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full p-4 bg-white/80 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                className="w-full p-4 bg-white/80 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/20 transition transform hover:-translate-y-0.5 cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p
                className={`mt-4 text-center font-bold text-sm ${success.includes("successfully") ? "text-green-600 animate-pulse" : "text-red-650"
                  }`}
              >
                {success}
              </p>
            )}
          </form>

          {/* Social Links */}
          <div className="mt-10 flex flex-col items-center gap-3 pt-6 border-t border-slate-200/50">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Connect with the Developer</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
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
      </div>
    </div>
  );
};

export default ContactPage;
