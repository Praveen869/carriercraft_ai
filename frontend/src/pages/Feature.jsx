import React, { useEffect, useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import OptimiseResume from "../components/Resume/OptimiseResume";
import KeywordMatch from "../components/keywordMatch";
import axios from "axios";

const Features = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [parsedText, setParsedText] = useState("");

  // Job search states
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("remote");
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobError, setJobError] = useState("");

  // AI job suggestions
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiSuggestLoading, setAiSuggestLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const isAuth = !!token;
    setIsAuthenticated(isAuth);
    if (isAuth) fetchAISuggestions();
  }, [token]);

  const fetchAISuggestions = async () => {
    try {
      setAiSuggestLoading(true);
      const res = await axios.get("/api/resume", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success && res.data.data.length > 0) {
        const skills = res.data.data[0].parsedData?.skills || [];
        if (skills.length > 0) {
          const aiRes = await axios.post("/api/ai/suggest-jobs", { parsedSkills: skills });
          setAiSuggestions(aiRes.data.suggestedJobs || []);
        }
      }
    } catch (err) {
      console.error("AI suggestions error:", err);
    } finally {
      setAiSuggestLoading(false);
    }
  };

  const fetchExternalJobs = async () => {
    if (!jobTitle.trim()) {
      setJobError("Please enter a job title or keyword.");
      setJobs([]);
      return;
    }

    try {
      setLoadingJobs(true);
      setJobError("");

      console.log("Fetching jobs with:", { jobTitle, jobLocation, token });

      const res = await axios.get(
        `/api/jobs/external?query=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(
          jobLocation
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response from backend:", res.data);

      const jobsData = res.data?.data;
      if (res.data?.success && Array.isArray(jobsData) && jobsData.length > 0) {
        setJobs(jobsData);
      } else if (res.data?.success && Array.isArray(jobsData) && jobsData.length === 0) {
        setJobs([]);
        setJobError("No jobs found for the given criteria.");
      } else {
        setJobs([]);
        setJobError(res.data?.message || "Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);

      if (err.response) {
        console.error("Backend response:", err.response.data);
        setJobError(`Server error: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setJobError("No response from server. Check your network or backend.");
      } else {
        setJobError(`Error: ${err.message}`);
      }

      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  const featuresList = [
    {
      title: "Resume Parsing",
      description: "Instantly extract key details from your CV to make it recruiter-ready.",
      component: (
        <ResumeUpload
          setResumeId={setResumeId}
          setParsedSkills={setParsedSkills}
          setParsedText={setParsedText}
        />
      ),
    },
    {
      title: "Optimise Resume",
      description: "Enhance your resume for better alignment with job requirements.",
      component: <OptimiseResume resumeId={resumeId} parsedSkills={parsedSkills} />,
    },
    {
      title: "Keyword Matching",
      description: "Check how well your resume matches job keywords to boost shortlisting.",
      component: <KeywordMatch parsedSkills={parsedSkills} parsedText={parsedText} />,
    },
    {
      title: "Job Search",
      description: "Find relevant jobs and directly apply from the list.",
      component: isAuthenticated ? (
        <div className="flex flex-col space-y-4 h-full flex-1">

          {/* AI Suggested Job Roles */}
          {aiSuggestLoading ? (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <svg className="animate-spin h-3.5 w-3.5 text-purple-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI analysing your resume skills...
            </div>
          ) : aiSuggestions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block"></span>
                  AI Suggested Roles (click to search)
                </p>
                <button
                  onClick={fetchAISuggestions}
                  title="Refresh AI suggestions"
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-500 hover:text-blue-700 transition-all cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setJobTitle(s.title);
                      setTimeout(() => fetchExternalJobs(), 100);
                    }}
                    title={s.reason}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm"
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Job title or keywords..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 focus:border-[#7C3AED] text-sm transition"
            />
            <input
              type="text"
              placeholder="Location (default: remote)"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 focus:border-[#7C3AED] text-sm transition"
            />
          </div>

          <button
            type="button"
            onClick={fetchExternalJobs}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 px-6 rounded-xl transition duration-150 transform hover:-translate-y-0.5 shadow-md shadow-purple-500/10 cursor-pointer text-sm"
          >
            {loadingJobs ? "Searching..." : "Search Jobs"}
          </button>

          {jobError && <p className="text-red-600 text-xs font-bold animate-pulse">{jobError}</p>}

          <div className="flex-1 overflow-y-auto mt-2 space-y-3 pr-1" style={{ maxHeight: "220px" }}>
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="p-4 border border-purple-100 bg-purple-50/20 rounded-2xl hover:shadow-md transition flex flex-col space-y-1.5"
              >
                <p className="font-extrabold text-[#7C3AED] text-sm">{job.title}</p>
                <p className="text-slate-800 text-xs font-bold">{job.company}</p>
                <p className="text-slate-500 text-[10px]">
                  {job.location} | {job.type || "N/A"} | {job.salary || "Salary not specified"}
                </p>
                <p
                  className="text-slate-600 text-xs leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: job.snippet }}
                ></p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C3AED] hover:text-[#6D28D9] text-xs font-extrabold underline block pt-1"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-red-600 font-bold text-sm">Login/Register to search jobs.</p>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EFF3FD] via-[#F4F7FF] to-[#E9EDF8] text-slate-800 px-6 md:px-12 py-16 overflow-hidden">
      {/* Premium Dreamy Pastel Fluid Multi-Shade Gradient Blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-[#C5CDFA]/40 via-[#D6DCFA]/50 to-[#FDE8E5]/30 rounded-full filter blur-3xl opacity-90 animate-float-slow"></div>
      <div className="absolute left-[15%] top-[5%] w-[45rem] h-[45rem] bg-gradient-to-br from-[#E2DBFA]/50 via-[#E8E2FA]/50 to-[#D5EDFC]/40 rounded-full filter blur-3xl opacity-85 animate-float"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#D5EDFC]/40 via-[#E8E2FA]/40 to-[#C5CDFA]/30 rounded-full filter blur-3xl opacity-75 animate-float-reverse"></div>

      <div className="relative z-10 pt-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200/50">Core Tools</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight leading-tight">
            Explore <span className="font-cormorant font-black text-slate-900 italic tracking-wide text-4xl md:text-6xl">CareerCraft <span className="text-[#2563EB]">AI</span></span> Features
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl mx-auto font-normal">
            Upload your resume, analyze alignment scores, optimize keywords, and search for active remote jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuresList.map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-white/60 border border-white/80 shadow-md backdrop-blur-md rounded-3xl hover:shadow-xl hover:scale-[1.01] hover:border-purple-300 transition duration-300 flex flex-col overflow-hidden"
              style={{ minHeight: "450px", maxHeight: "700px" }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-2">{feature.title}</h3>
              {!isAuthenticated && feature.title !== "Job Search" ? (
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <p className="text-slate-500 text-sm mb-4">Please register or log in to access this feature.</p>
                  <p className="text-red-600 font-bold text-sm bg-red-50 border border-red-150 px-3.5 py-1.5 rounded-xl">
                    Authentication Required
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-1 h-full">
                  <p className="mb-6 text-slate-600 text-sm">{feature.description}</p>
                  <div className="flex-1 flex flex-col h-full">
                    {feature.component}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
