// src/services/job.service.js
const axios = require("axios");

/**
 * Fetch jobs from Jooble API
 * @param {string} query - Job title or keywords
 * @param {string} location - Location (city, country or "remote")
 * @returns {Promise<Array>} - Array of job objects
 */
const fetchJobs = async (query = "", location = "remote") => {
  try {
    // ✅ Guard: empty query
    if (!query) return [];

    // ✅ Guard: API key check
    if (!process.env.JOOBLE_API_KEY) {
      console.error("JOOBLE_API_KEY is missing");
      return [];
    }

    const response = await axios.post(
      `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
      {
        keywords: query,
        location: location || "remote",
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    const jobs = response.data?.jobs;

    // ✅ Guard: unexpected response
    if (!Array.isArray(jobs)) {
      console.error("Unexpected Jooble response:", response.data);
      return [];
    }

    // ✅ Normalize job data
    return jobs.map((job) => ({
      title: job.title || "N/A",
      company: job.company || "N/A",
      location: job.location || location,
      type: job.type || "N/A",
      link: job.link || "",
      snippet: job.snippet || "",
      updated: job.updated || "",
      salary: job.salary || "Not specified",
    }));
  } catch (error) {
    // 🔥 MOST IMPORTANT FIX: DO NOT THROW
    console.error(
      "Jooble fetch failed:",
      error.response?.data || error.message
    );

    // ✅ Return empty array instead of crashing backend
    return [];
  }
};

module.exports = { fetchJobs };
