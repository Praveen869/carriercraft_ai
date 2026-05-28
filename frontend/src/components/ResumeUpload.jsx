import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ setResumeId, setParsedSkills, setParsedText }) => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState({ skills: [], email: "", phone: "", links: [], text: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setParsedData({ skills: [], email: "", phone: "", links: [], text: "" });
    setError("");
    setResumeId(null);
    setParsedSkills([]);
    setParsedText("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          withCredentials: true
        }
      );

      const data = response.data?.data?.parsedData;
      const id = response.data?.data?._id;

      const skills = Array.isArray(data.skills) ? data.skills : [];
      const text = data.text || "";

      setParsedData({
        skills,
        email: data.email || "",
        phone: data.phone || "",
        links: Array.isArray(data.links) ? data.links : [],
        text
      });

      // Set parent state
      setResumeId(id);
      setParsedSkills(skills);
      setParsedText(text);

    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Failed to upload resume. Try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setParsedData({ skills: [], email: "", phone: "", links: [], text: "" });
    setError("");
    setResumeId(null);
    setParsedSkills([]);
    setParsedText("");
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {!parsedData.skills.length && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-purple-200 hover:border-[#7C3AED]/40 bg-purple-50/20 rounded-2xl p-8 transition duration-200 text-center cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg className="w-8 h-8 text-[#7C3AED]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-slate-700 text-xs font-bold">
                {file ? `Selected: ${file.name}` : "Drag & drop or click to upload resume"}
              </p>
              <p className="text-[10px] text-slate-400">Accepts PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition duration-150 transform hover:-translate-y-0.5 text-sm cursor-pointer shadow-md ${loading
                ? "bg-slate-350 text-slate-500 cursor-not-allowed"
                : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-purple-500/10"
              }`}
          >
            {loading ? "Parsing Resume..." : "Upload & Parse"}
          </button>
          {error && <p className="text-red-600 text-xs font-bold text-center animate-pulse">{error}</p>}
        </div>
      )}

      {parsedData.skills.length > 0 && (
        <section className="bg-purple-50/30 border border-purple-100/50 rounded-2xl p-5 space-y-4 max-h-[300px] overflow-y-auto">
          <div>
            <h4 className="text-xs font-black text-[#7C3AED] uppercase tracking-wider mb-2">Parsed Skills</h4>
            <div className="flex flex-wrap gap-2">
              {parsedData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#7C3AED]/10 text-[#7C3AED] px-2.5 py-1 rounded-lg text-xs font-bold border border-[#7C3AED]/15"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xs space-y-2 border-t border-purple-100/40 pt-3 text-slate-700">
            {parsedData.email && <p><strong>Email:</strong> {parsedData.email}</p>}
            {parsedData.phone && <p><strong>Phone:</strong> {parsedData.phone}</p>}
            {parsedData.links.length > 0 && <p className="break-all"><strong>Links:</strong> {parsedData.links.join(", ")}</p>}
          </div>
        </section>
      )}

      {parsedData.skills.length > 0 && (
        <div className="flex justify-end mt-auto pt-3">
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-650 text-white px-5 py-2.5 rounded-xl font-bold transition text-xs transform hover:-translate-y-0.5 cursor-pointer shadow-md shadow-red-500/10"
          >
            Clear Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
