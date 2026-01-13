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
You are an ATS Resume Optimizer specialized in ${role} roles.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Job Description: "${jobDesc}"

Tasks:
1. Compare resume skills with the JD.
2. Identify which resume skills are relevant to the JD (relevantSkills).
3. Identify missing skills/keywords required in the JD but not in the resume (missingSkills).
4. Calculate an ATS matchScore (0-100).
5. Provide short actionable suggestions.

Return ONLY JSON in this format:

{
  "relevantSkills": ["..."],
  "missingSkills": ["..."],
  "matchScore": 0,
  "suggestions": ["..."]
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
You are an ATS Resume Matching Engine specialized in ${role} and all software/tech domains.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Job Description: "${jobDesc}"

Tasks:
1. Identify matching and missing keywords relevant to this role/domain.
2. Compute matchScore (0-100) based on skill alignment.
3. Provide actionable suggestions.
4. Return ONLY JSON:

{
  "matchScore": 0,
  "matchingKeywords": ["..."],
  "missingKeywords": ["..."],
  "suggestions": ["..."]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

module.exports = { optimizeResume: optimizeSkills, keywordMatch };