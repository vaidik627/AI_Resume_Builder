import Anthropic from '@anthropic-ai/sdk';

function createClient() {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
        throw new Error('Please add your Anthropic API key to the .env file as VITE_ANTHROPIC_API_KEY');
    }
    return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

export async function enhanceResumeContent({ experience, projects }) {
    const client = createClient();

    const expEntries = experience
        .filter(e => e.company || e.description)
        .map((e, i) => `[exp_${i}] Role: "${e.role || 'N/A'}", Company: "${e.company || 'N/A'}", Description: "${e.description || ''}"`)
        .join('\n');

    const projEntries = projects
        .filter(p => p.title || p.description)
        .map((p, i) => `[proj_${i}] Title: "${p.title || 'N/A'}", Tech: "${p.technologies || ''}", Description: "${p.description || ''}"`)
        .join('\n');

    const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1200,
        messages: [{
            role: 'user',
            content: `You are a senior resume writer. Rewrite each description below with strong action verbs, quantified achievements, and ATS-optimized language. Keep each to 1-2 impactful sentences.

EXPERIENCE:
${expEntries || 'None'}

PROJECTS:
${projEntries || 'None'}

Respond with ONLY valid JSON — no markdown fences, no explanation:
{"experience":[{"index":0,"description":"..."}],"projects":[{"index":0,"description":"..."}]}`
        }]
    });

    const raw = message.content[0].text.trim();
    return JSON.parse(raw);
}

export async function generateCoverLetter(formData) {
    const client = createClient();

    const today = new Date().toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    });

    const contactBlock = [
        formData.fullName,
        formData.email,
        formData.phone,
        formData.linkedin
    ].filter(Boolean).join('\n');

    const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{
            role: 'user',
            content: `Write a ${formData.tone.toLowerCase()} professional cover letter using the details below. Make it compelling and personalized.

TARGET ROLE: ${formData.jobTitle} at ${formData.companyName}${formData.companyLocation ? ` — ${formData.companyLocation}` : ''}
JOB DESCRIPTION: ${formData.jobDescription}
APPLICANT EXPERIENCE: ${formData.experience || 'Not provided'}
KEY SKILLS: ${formData.skills || 'Not provided'}

Format the letter EXACTLY as:
${contactBlock}

${today}

Hiring Manager
${formData.companyName}${formData.companyLocation ? '\n' + formData.companyLocation : ''}

Dear Hiring Manager,

[Paragraph 1 — Strong opening that expresses interest and directly connects applicant's top qualification to the job]

[Paragraph 2 — Expand on 2-3 specific experiences/skills that match the job description]

[Paragraph 3 — Express enthusiasm for the company, include a clear call-to-action]

Sincerely,

${formData.fullName}

Return ONLY the formatted cover letter. No extra commentary.`
        }]
    });

    return message.content[0].text;
}
