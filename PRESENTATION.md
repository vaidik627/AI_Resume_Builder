# AI Resume Builder — Project Presentation

---

## Slide 1: Title Slide

# AI Resume Builder
### An Intelligent Career Toolkit Powered by Large Language Models

**Presented by:** Prakash Choudhary
**Program:** B.Tech CSE with Data Science (IBM) — 8th Semester
**Institution:** Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore
**Academic Year:** 2025–2026

---

## Slide 2: Problem Statement

### The Job Application Crisis

- **1,200+** engineering graduates compete for the same roles every semester
- Average recruiter spends **6–7 seconds** scanning a resume
- **75% of resumes** are rejected by ATS (Applicant Tracking Systems) before a human sees them
- Students spend **3–5 hours** crafting a single job application manually
- Most resumes are **generic** — not tailored to the specific job description

> **The Gap:** Students have the skills but lack the tools to present them effectively at scale.

---

## Slide 3: Proposed Solution

### One Platform. Five AI Tools. Zero Manual Work.

**AI Resume Builder** is a full-stack web application that uses Large Language Models to automate the entire job application pipeline.

| Problem | Our Solution |
|---|---|
| Generic resume | AI-tailored bullet points |
| No cover letter | Auto-generated in seconds |
| Interview anxiety | Practice Q&A with model answers |
| Cold outreach is hard | AI-written cold emails |
| ATS rejection | Real-time ATS match score |

**Key Innovation:** Upload your resume PDF once → all tools auto-fill → only paste the job description → done.

---

## Slide 4: System Architecture

### Technology Stack

```
┌─────────────────────────────────────────────┐
│              Frontend (React 19)             │
│  Vite 7 · Tailwind CSS 4 · React Router 7   │
│         React Context (Global State)         │
└──────────────────┬──────────────────────────┘
                   │ HTTP (OpenAI-compatible)
┌──────────────────▼──────────────────────────┐
│           Vite Dev Proxy (CORS Fix)          │
│         /ollama-api → ollama.com/v1          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│         Ollama Cloud API (Free Tier)         │
│       Model: gpt-oss:20b (20B params)        │
│     OpenAI-compatible · No cost · Fast       │
└─────────────────────────────────────────────┘
```

**PDF Processing:** `pdfjs-dist` v5 (browser-native, no server needed)
**PDF Export:** `jsPDF` + `html2canvas`

---

## Slide 5: Core Features

### Feature 1 — Smart Resume Builder
- Live side-by-side preview as you type
- Upload existing PDF → AI extracts all data automatically
- **Enhance with AI** — rewrites bullet points to be quantifiable and impactful
- One-click PDF export (ATS-friendly format)

### Feature 2 — AI Cover Letter Generator
- Auto-fills your profile from uploaded resume
- Only input needed: job title + company + job description
- Three tone options: Professional / Confident / Enthusiastic
- Instant PDF download

### Feature 3 — AI Interview Prep
- Generates 5 tailored Q&A pairs per job (Technical, Behavioral, Situational, Culture-fit)
- **Practice Mode** — Flashcard-style: read question → think → reveal answer
- **Generate More** — append 5 additional questions without losing previous ones
- Progress tracker during practice session

---

## Slide 6: Core Features (Continued)

### Feature 4 — Cold Email Generator
- Generates subject line + email body under 80 words
- Professional outreach tone with clear call-to-action
- Auto-fills sender profile from uploaded resume
- One-click copy to clipboard

### Feature 5 — 1-Click Job Application Package ⚡ (Flagship)
- Paste **one** job description
- Simultaneously generates:
  - Resume improvement bullets + missing skills
  - Professional summary
  - Full cover letter
  - Cold email (subject + body)
  - 5 interview Q&As
  - ATS match score (0–100) with feedback
- All 5 AI calls run in **parallel** with retry logic
- Tabbed output with copy functionality

---

## Slide 7: Key Technical Innovations

### 1. PDF Resume Parser (Browser-Native)
```
User uploads PDF → pdfjs-dist extracts text →
AI (gpt-oss:20b) parses into structured JSON →
All pages auto-populate instantly
```
No server, no file upload, 100% client-side processing.

### 2. Global Resume State via React Context
```
Upload PDF once on any page →
ResumeContext stores the data →
Navigate to Cover Letter, Interview Prep, Cold Email →
All fields already filled
```

### 3. Token Budget Management
`gpt-oss:20b` uses internal reasoning tokens before output.
Setting `max_tokens < 1200` returns empty string.
Solution: minimum 1200–2000 tokens per call.

### 4. Parallel AI Calls with Staggered Retry
```js
// 5 simultaneous API calls, staggered 400ms apart
// 2 retries per call with 1500ms delay
// Prevents rate-limit failures on free tier
```

### 5. Markdown Stripping
AI sometimes returns `**bold**` markers in plain text.
Custom `stripMarkdownText()` cleans all responses before display.

---

## Slide 8: Demo Flow

### User Journey — From Zero to Application-Ready in 2 Minutes

```
Step 1: Open AI Resume Builder
        ↓
Step 2: Upload existing resume PDF
        → AI extracts: name, email, phone, skills,
          education, experience, projects
        ↓
Step 3: Navigate to "1-Click Apply"
        → Profile already filled from PDF
        → Paste target job description
        → Click Generate
        ↓
Step 4: Receive in ~30 seconds:
        ✓ Resume bullets tailored to JD
        ✓ Cover letter (Professional tone)
        ✓ Cold email to recruiter
        ✓ 5 interview questions + model answers
        ✓ ATS score: 87/100
        ↓
Step 5: Practice answers in Flashcard Mode
        → Progress bar, reveal-on-click, Prev/Next
```

**Total time: Under 2 minutes vs. 3–5 hours manually**

---

## Slide 9: Results & Impact

### Quantitative Metrics

| Metric | Value |
|---|---|
| AI response time (single call) | ~8–15 seconds |
| 1-Click package generation time | ~25–40 seconds |
| Resume parse accuracy | ~90%+ on clean PDFs |
| Pages / Tools built | 6 tools, 7 routes |
| AI functions implemented | 8 distinct LLM calls |
| Lines of code | ~3,000+ |

### Qualitative Outcomes
- **Zero manual re-entry** across all tools after one PDF upload
- **ATS match feedback** tells students exactly what skills to add
- **Practice Mode** reduces interview anxiety through active recall
- **Completely free** — no API costs on the Ollama Cloud free tier

### Differentiation from Competitors
Unlike Resume.io or Zety (paid, no AI tailoring), this tool is:
- **Free**, **open**, **AI-native**, and built for **students**

---

## Slide 10: Conclusion & Future Scope

### What We Built
A complete AI-powered career toolkit that takes a student from resume PDF to a fully tailored job application package — in under 2 minutes, for free.

### Key Takeaways
- Demonstrated practical application of **LLM APIs** in real-world products
- Built a **production-grade React app** with global state, routing, and PDF processing
- Solved real student pain points with measurable time savings

### Future Scope

| Enhancement | Description |
|---|---|
| **n8n Workflow Integration** | Auto-send cold emails via Gmail when user clicks Apply |
| **Resume Templates** | Multiple design themes for different industries |
| **Job Board Scraping** | Paste a job URL instead of the full description |
| **Version History** | Save multiple resume versions per job application |
| **Gemini / GPT-4o** | Upgrade model for higher quality output |
| **Mobile App** | React Native version for on-the-go applications |

---

### Thank You

**GitHub Repository:** `collage_8th_sem_project`
**Built with:** React · Vite · Tailwind · Ollama Cloud · pdfjs-dist · jsPDF

> *"The goal was not to build a resume builder. The goal was to build an unfair advantage for every student competing for the same job."*
