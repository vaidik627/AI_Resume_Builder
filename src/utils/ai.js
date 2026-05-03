import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OLLAMA_API_KEY,
  baseURL: `${window.location.origin}/ollama-api`,
  dangerouslyAllowBrowser: true,
});

const MODEL = 'gpt-oss:20b';

function stripMarkdownJson(content) {
  let text = content.trim();
  if (text.startsWith('```json')) text = text.slice(7);
  else if (text.startsWith('```')) text = text.slice(3);
  if (text.endsWith('```')) text = text.slice(0, -3);
  return text.trim();
}

function stripMarkdownText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .trim();
}

export async function enhanceResumeContent({ experience, projects, jobDescription = "" }) {
  const prompt = `You are an expert ATS resume writer.

${jobDescription ? `TARGET JOB DESCRIPTION:\n${jobDescription}\n\nPlease heavily tailor the bullet points to align with the skills and keywords in the job description above.` : 'Please improve the professionalism and impact of the bullet points using strong action verbs.'}

Here is the current content:
EXPERIENCE:
${JSON.stringify(experience.map((e, i) => ({ index: i, description: e.description })))}

PROJECTS:
${JSON.stringify(projects.map((p, i) => ({ index: i, description: p.description })))}

Task: Rewrite the descriptions to be highly professional, quantifiable, and impactful.
You MUST respond with ONLY valid JSON in the exact following structure. Do not wrap it in markdown code blocks.
{
  "experience": [
    { "index": 0, "description": "Your enhanced bullet point..." }
  ],
  "projects": [
    { "index": 0, "description": "Your enhanced bullet point..." }
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are an expert JSON-only API. Never return conversational text.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = stripMarkdownJson(response.choices[0].message.content);
    return JSON.parse(content);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error(`Enhance failed: ${error?.message || error}`);
  }
}

export async function scoreResume(jobDescription, skills, experience, projects, education = null) {
  const educationStr = education
    ? `Education: ${education.degree || ''} from ${education.university || ''} (${education.gradYear || ''})${education.cgpa ? ', GPA: ' + education.cgpa : ''}`
    : '';

  const prompt = `You are an expert technical recruiter analyzing a resume against a job description.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE PROFILE:
${educationStr}
Skills: ${skills}
Experience: ${JSON.stringify(experience.map(e => e.description || `${e.role} at ${e.company}`))}
Projects: ${JSON.stringify(projects.map(p => p.description || p.title || ''))}

Task: Provide an ATS score (0-100) and 3 short, brutal/playful bullet points of feedback based ONLY on what the candidate is actually missing from the JD. Do not mention things that are already present in their profile.
Respond ONLY in valid JSON format. Do not wrap in markdown code blocks:
{
  "score": 85,
  "feedback": [
    "Missing React experience even though it's the core requirement!",
    "No quantified metrics in project descriptions — add numbers like 'improved speed by 30%'."
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a JSON-only API. Return only valid JSON, no markdown.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 1500
    });

    const content = stripMarkdownJson(response.choices[0].message.content);
    return JSON.parse(content);
  } catch (error) {
    console.error("Scoring Error:", error);
    throw new Error("Failed to score resume.");
  }
}

export async function generateCoverLetter(formData) {
  const prompt = `You are an expert career coach and cover letter writer.
Write a professional cover letter based on the following details:
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
LinkedIn: ${formData.linkedin}
Target Job Title: ${formData.jobTitle}
Target Company: ${formData.companyName}
Company Location: ${formData.companyLocation}
Job Description: ${formData.jobDescription}
Candidate Experience: ${formData.experience}
Candidate Skills: ${formData.skills}
Desired Tone: ${formData.tone}

Please write a highly professional and tailored cover letter. Return ONLY the raw text of the cover letter.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are an expert cover letter writer. Return only the raw text of the cover letter.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return stripMarkdownText(response.choices[0].message.content);
  } catch (error) {
    console.error("Cover Letter Generation Error:", error);
    throw new Error("Failed to generate cover letter.");
  }
}

export async function generateInterviewQuestions({ jobTitle, jobDescription, skills, experience }) {
  const prompt = `You are a senior technical interviewer at a top tech company.

Generate exactly 5 interview questions with SHORT model answers (2-3 sentences each max).
Mix: 2 technical, 1 behavioral, 1 situational, 1 culture-fit.

Job Title: ${jobTitle}
Job Description: ${jobDescription}
Candidate Skills: ${skills}
Candidate Experience: ${JSON.stringify(experience.filter(e => e.role).map(e => `${e.role} at ${e.company}`))}

IMPORTANT: Keep each modelAnswer under 60 words. Respond ONLY in valid JSON. Do not wrap in markdown code blocks:
{
  "questions": [
    {
      "type": "Technical",
      "question": "...",
      "modelAnswer": "..."
    }
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a JSON-only API. Return only valid JSON, no markdown. Keep answers concise.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = stripMarkdownJson(response.choices[0].message.content);
    const parsed = JSON.parse(content);
    if (parsed.questions) {
      parsed.questions = parsed.questions.map(q => ({
        ...q,
        question: stripMarkdownText(q.question),
        modelAnswer: stripMarkdownText(q.modelAnswer),
      }));
    }
    return parsed;
  } catch (error) {
    console.error("Interview Question Error:", error);
    throw new Error(`Interview prep failed: ${error?.message || error}`);
  }
}

export async function generateLinkedInSummary({ fullName, jobTitle, skills, experience, projects }) {
  const prompt = `You are a LinkedIn profile expert. Write a LinkedIn headline and About section.

Rules:
- Headline: max 15 words
- About: max 80 words, first person, ends with a call-to-action

Name: ${fullName}
Role: ${jobTitle}
Skills: ${skills}
Experience: ${experience.filter(e => e.role).map(e => `${e.role} at ${e.company}`).join(', ')}
Projects: ${projects.filter(p => p.title).map(p => p.title).join(', ')}

Respond ONLY in valid JSON. Do not wrap in markdown:
{"headline": "...", "about": "..."}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a JSON-only API. Return only valid JSON, no markdown.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const content = stripMarkdownJson(response.choices[0].message.content);
    return JSON.parse(content);
  } catch (error) {
    console.error("LinkedIn Summary Error:", error);
    throw new Error(`LinkedIn optimizer failed: ${error?.message || error}`);
  }
}

export async function generateColdEmail({ fullName, jobTitle, companyName, recruiterName, skills, experience }) {
  const prompt = `Write a short professional outreach email for a job application.

Details:
- Sender Name: ${fullName}
- Applying For: ${jobTitle} at ${companyName}
- Recipient: ${recruiterName || 'Hiring Manager'}
- Sender Skills: ${skills || 'software development'}
- Sender Background: ${experience[0] ? `${experience[0].role} at ${experience[0].company}` : 'recent graduate'}

Requirements: under 80 words, professional tone, clear call-to-action asking for a brief call.

You MUST return valid JSON only with exactly these two fields, no extra text:
{"subject": "write subject line here", "body": "write email body here"}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a JSON-only API. Return only valid JSON, no markdown.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 1200,
    });

    const content = stripMarkdownJson(response.choices[0].message.content);
    return JSON.parse(content);
  } catch (error) {
    console.error("Cold Email Error:", error);
    throw new Error(`Cold email failed: ${error?.message || error}`);
  }
}

export async function extractResumeData(rawText) {
  const prompt = `You are a resume parser. Extract structured data from this resume text.

Resume Text:
${rawText.slice(0, 3000)}

Return ONLY valid JSON with these exact fields (use empty string if not found):
{
  "fullName": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "degree": "",
  "university": "",
  "gradYear": "",
  "cgpa": "",
  "skills": "",
  "experience": [
    { "company": "", "role": "", "duration": "", "description": "" }
  ],
  "projects": [
    { "title": "", "technologies": "", "description": "" }
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a JSON-only resume parser. Return only valid JSON, no markdown, no explanation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      max_tokens: 2000,
    });
    const content = stripMarkdownJson(response.choices[0].message.content);
    return JSON.parse(content);
  } catch (error) {
    console.error("Resume Extract Error:", error);
    throw new Error(`Failed to parse resume: ${error?.message || error}`);
  }
}

export async function generateResumeTips({ jobTitle, jobDescription, skills, experience }) {
  const prompt = `You are a resume coach. Based on this job and candidate, write resume improvement suggestions.

Job Title: ${jobTitle}
Job Description: ${jobDescription.slice(0, 600)}
Candidate Skills: ${skills}
Candidate Experience: ${experience}

You MUST return valid JSON only with exactly these fields, no extra text:
{"bullets":["action-verb bullet 1","action-verb bullet 2","action-verb bullet 3"],"missingSkills":["skill1","skill2","skill3"],"summary":"one sentence professional summary"}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a JSON-only API. Return only valid JSON, no markdown.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });
    const content = stripMarkdownJson(response.choices[0].message.content);
    return JSON.parse(content);
  } catch (error) {
    console.error("Resume Tips Error:", error);
    throw new Error(`Resume tips failed: ${error?.message || error}`);
  }
}
