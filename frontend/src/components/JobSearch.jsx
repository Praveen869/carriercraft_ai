import React, { useEffect, useState } from "react";
import axios from "axios";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("remote");
  const [externalJobs, setExternalJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobError, setJobError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // AI suggestions states
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [resumeError, setResumeError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsAuthenticated(!!token);
    if (token) {
      fetchAISuggestions();
    }
  }, [token]);

  const fetchAISuggestions = async () => {
    try {
      setAiLoading(true);
      setResumeError("");
      const res = await axios.get("/api/resume", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success && res.data.data.length > 0) {
        const latestResume = res.data.data[0];
        const skills = latestResume.parsedData?.skills || [];
        if (skills.length > 0) {
          const aiRes = await axios.post("/api/ai/suggest-jobs", {
            parsedSkills: skills
          });
          setSuggestedProfiles(aiRes.data.suggestedJobs || []);
        } else {
          setResumeError("Parsed skills not found in your latest resume. Please parser your resume first.");
        }
      } else {
        setResumeError("No resume uploaded yet. Upload a resume in the dashboard to unlock custom AI recommendations!");
      }
    } catch (err) {
      console.error("AI suggestions error:", err);
      setResumeError("Could not load AI suggestions at this moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const fetchExternalJobs = async (searchQuery, searchLocation) => {
    if (!searchQuery) return;

    try {
      setLoading(true);
      setJobError("");
      const res = await axios.get(
        `/api/jobs/external?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`
      );
      setExternalJobs(res.data.data || []);
    } catch (err) {
      console.error(err.response || err);
      setJobError("Failed to fetch jobs. Try again.");
      setExternalJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExternalJobs(query, location);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    fetchExternalJobs(title, location);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-slate-100/50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Find Your <span className="text-blue-600 bg-clip-text">Perfect Career Match</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Search jobs across premium platforms or let CareerCraft AI recommend roles tailored specifically to your unique skillset.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Authentication Required</h3>
            <p className="text-slate-500 mb-6">Please log in or register to access customized AI job recommendations and job search tools.</p>
          </div>
        ) : (
          <>
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8 bg-white border border-slate-200 p-4 rounded-2xl shadow-md flex flex-col md:flex-row gap-4 items-center transition-all hover:shadow-lg">
              <div className="flex-1 w-full relative">
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title or keywords..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
              <div className="flex-1 w-full relative">
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (e.g. remote)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Searching...
                  </span>
                ) : (
                  "Search Jobs"
                )}
              </button>
            </form>

            {/* AI Suggested Profiles Section */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-500">
                  AI Job Suggestions (Click to Search)
                </h3>
              </div>

              {aiLoading ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-3 text-slate-600">
                    <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Analysing your resume skills to find perfect roles...</span>
                  </div>
                </div>
              ) : resumeError ? (
                <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-center text-sm text-slate-500">
                  {resumeError}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestedProfiles.map((profile, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSuggestionClick(profile.title)}
                      className="bg-white hover:bg-blue-50/20 border border-slate-200 hover:border-blue-400 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group text-left relative overflow-hidden"
                    >
                      {/* Interactive hover glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl translate-x-8 -translate-y-8 group-hover:bg-blue-500/10 transition-all" />

                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 mb-1.5">
                        {profile.title}
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </h4>
                      <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                        {profile.reason}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.keywords?.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message */}
            {jobError && (
              <div className="max-w-3xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center text-sm shadow-sm">
                {jobError}
              </div>
            )}

            {/* Jobs Results Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {externalJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  style={{ minHeight: "220px", maxHeight: "350px" }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-slate-900 line-clamp-1">{job.title}</h4>
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <strong>Company:</strong> {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <strong>Location:</strong> {job.location || location}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed overflow-y-auto line-clamp-4 pr-1" style={{ maxHeight: "120px" }}>
                      {job.description}
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Source: Jooble</span>
                    <a
                      href={`https://jooble.org/jobs/${encodeURIComponent(job.title)}?l=${encodeURIComponent(location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
                    >
                      Apply Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {externalJobs.length === 0 && !loading && (
              <div className="text-center text-slate-400 mt-10 text-sm">
                No active jobs displayed. Use the search bar or click an AI job suggestion to find openings.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
