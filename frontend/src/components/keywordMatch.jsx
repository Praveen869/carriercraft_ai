import React, { useState } from "react";
import axios from "axios";

const KeywordMatch = ({ parsedSkills = [] }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/ai/match",
        { parsedSkills, jobDescription },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          withCredentials: true
        }
      );

      if (response.data) setResult(response.data);
      else setError("No data returned from backend.");
    } catch (err) {
      console.error(err.response?.data || err);
      setError(
        err.response?.data?.error || "Failed to match keywords. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setResult(null);
    setError("");
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* Textarea */}
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full h-28 p-3.5 mb-3.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none text-sm transition"
      />

      {error && <p className="text-red-600 text-xs font-bold mb-2 animate-pulse">{error}</p>}

      {/* Result area */}
      {result && (
        <div className="p-4 bg-purple-50/40 border border-purple-100/50 rounded-xl text-sm text-slate-800 relative flex-1 overflow-y-auto mb-3 max-h-[300px]">
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
            title="Clear"
          >
            &times;
          </button>

          <h3 className="font-extrabold text-[#7C3AED] text-sm mb-3">Matching Details:</h3>
          <div className="space-y-3 text-xs md:text-sm">
            {result.matchScore !== undefined && (
              <p>
                <strong>Match Score:</strong>{" "}
                <span className="text-sm font-extrabold text-[#7C3AED] bg-purple-100/50 px-2 py-0.5 rounded-md border border-purple-200/50">
                  {result.matchScore}%
                </span>
              </p>
            )}
            {result.matchingKeywords?.length > 0 && (
              <p className="text-green-600">
                <strong>Matching Keywords:</strong> {result.matchingKeywords.join(", ")}
              </p>
            )}
            {result.missingKeywords?.length > 0 && (
              <p className="text-red-600">
                <strong>Missing Keywords:</strong> {result.missingKeywords.join(", ")}
              </p>
            )}
            {result.suggestions?.length > 0 && (
              <div>
                <strong>Suggestions:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-650">
                  {result.suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Match button at bottom */}
      <div className="mt-auto pt-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-xl transition duration-150 transform hover:-translate-y-0.5 cursor-pointer shadow-md shadow-purple-500/10 text-sm"
          disabled={loading}
        >
          {loading ? "Matching..." : "Match Keywords"}
        </button>
      </div>
    </div>
  );
};

export default KeywordMatch;
