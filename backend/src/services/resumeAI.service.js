const { generateText } = require("./ai.service");

// ----------------- Helper: safely parse AI JSON -----------------
function safeParseJSON(text) {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Empty AI response");
    }

    // 1. Remove markdown code fences ```json ... ```
    let cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 2. Remove JS-style comments
    cleaned = cleaned
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .trim();

    // 3. Extract FIRST valid JSON object only
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in AI response");
    }

    const jsonOnly = cleaned.slice(firstBrace, lastBrace + 1);

    return JSON.parse(jsonOnly);
  } catch (error) {
    console.error("AI returned invalid JSON after cleaning:\n", text);
    throw new Error("Invalid AI JSON response");
  }
}


// ----------------- JD ↔ Skills Optimization -----------------
async function optimizeSkills(parsedSkills, jobDesc) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];

  // Extract role/domain dynamically from JD
  const roleMatch = jobDesc
    ? jobDesc.match(
      /(frontend|backend|fullstack|mobile|qa|devops|data science|machine learning|ai|nlp|computer vision|cloud|security|cybersecurity|blockchain|web3|embedded|iot|game|ar|vr|metaverse|bi|analytics|database|sre|site reliability|robotics|automation|software|engineer|developer|designer)/i
    )
    : null;

  const role = roleMatch
    ? roleMatch[0].charAt(0).toUpperCase() + roleMatch[0].slice(1)
    : "Software Developer";

  const prompt = `
You are a highly premium ATS Resume Optimizer specialized in ${role} roles.

Inputs:
- Resume Skills (that the user already knows): ${JSON.stringify(skills)}
- Job Description (JD): "${jobDesc}"

Tasks:
1. Compare resume skills with the JD.
2. Identify which resume skills are relevant to the JD (relevantSkills).
3. Identify missing skills/keywords required in the JD but not in the resume (missingSkills).
   - NOTE: If the user already knows specific technologies (e.g., PostgreSQL, MongoDB) but the JD asks for a high-level concept (e.g., "database management & integration techniques"), list that high-level concept as missing BUT make sure to mention in the suggestions how the user can easily rephrase or map their existing skills to match this concept.
4. Calculate a realistic ATS matchScore (0-100).
5. Provide smart, highly detailed, and educational suggestions.
   - For each suggestion, explain clearly:
     a) Why this skill is missing or needs optimization.
     b) Exactly how to phrase/write it in the resume (give a concrete example, e.g., "Instead of just listing 'MongoDB', write 'Database Management & Integration (MongoDB)' to match the JD's requirement").

Return ONLY JSON in this format:

{
  "relevantSkills": ["..."],
  "missingSkills": ["..."],
  "matchScore": 0,
  "suggestions": [
    "Smart Tip: Explain the 'Why' & 'How to write' for missing/related skills dynamically"
  ]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

// ----------------- Resume ↔ Job Keyword Matching -----------------
async function keywordMatch(parsedSkills, jobDesc) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];

  const roleMatch = jobDesc.match(
    /(frontend|backend|fullstack|mobile|qa|devops|data science|machine learning|ai|nlp|computer vision|cloud|security|cybersecurity|blockchain|web3|embedded|iot|game|ar|vr|metaverse|bi|analytics|database|sre|site reliability|robotics|automation|software|engineer|developer|designer)/i
  );
  const role = roleMatch
    ? roleMatch[0].charAt(0).toUpperCase() + roleMatch[0].slice(1)
    : "Software Developer";

  const prompt = `
You are a highly premium ATS Resume Matching Engine specialized in ${role} and all software/tech domains.

Inputs:
- Resume Skills (user's current skills): ${JSON.stringify(skills)}
- Job Description (JD): "${jobDesc}"

Tasks:
1. Identify matching and missing keywords relevant to this role/domain.
   - NOTE: If the user knows related sub-skills (e.g., "Git, GitHub") but the JD asks for a broader concept (e.g., "Version Control System"), explain in suggestions how they can write it.
2. Compute matchScore (0-100) based on skill alignment.
3. Provide actionable suggestions that are highly educational:
   - For missing keywords, explain why they are important for this specific job role and give a clear rewrite template (e.g., "Change 'X' to 'Y'").
4. Return ONLY JSON:

{
  "matchScore": 0,
  "matchingKeywords": ["..."],
  "missingKeywords": ["..."],
  "suggestions": [
    "Educational Tip: Explain the mapping and how to rephrase the resume explicitly"
  ]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

// ----------------- Skill-based Job Profile Suggestion -----------------
async function suggestJobs(parsedSkills) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];

  const prompt = `
You are a highly premium AI career consultant and job matching agent.
Input skills that the candidate has: ${JSON.stringify(skills)}

Based on these specific skills, suggest the top 4-5 high-paying job profiles/roles that fit this candidate perfectly.
For each job profile, provide:
1. "title": A standard industry job title (e.g. "Full Stack Developer", "Data Scientist", "Backend Engineer").
2. "reason": A brief 1-2 sentence explanation of why this profile fits their skill set.
3. "keywords": 3-4 key tags/skills they can emphasize for this role.

Return ONLY JSON in this format:
{
  "suggestedJobs": [
    {
      "title": "...",
      "reason": "...",
      "keywords": ["...", "..."]
    }
  ]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

module.exports = { optimizeResume: optimizeSkills, keywordMatch, suggestJobs };