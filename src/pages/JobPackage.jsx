import React, { useState, useEffect } from 'react';
import {
  Zap, FileText, Mail, MessageSquare, TrendingUp, Sparkles,
  Copy, Check, AlertCircle, ChevronRight, Loader2, CheckCircle2
} from 'lucide-react';
import {
  generateCoverLetter,
  generateColdEmail,
  generateInterviewQuestions,
  scoreResume,
  generateResumeTips,
} from '../utils/ai';
import ResumeUploader from '../components/ResumeUploader';
import { useResume } from '../context/ResumeContext';

const TABS = [
  { key: 'resumeTips',    label: 'Resume Tips',     icon: FileText,      color: 'green' },
  { key: 'coverLetter',   label: 'Cover Letter',     icon: FileText,      color: 'indigo' },
  { key: 'coldEmail',     label: 'Cold Email',       icon: Mail,          color: 'amber' },
  { key: 'interviewPrep', label: 'Interview Prep',   icon: MessageSquare, color: 'purple' },
  { key: 'atsScore',      label: 'ATS Score',        icon: TrendingUp,    color: 'rose' },
];

const COLOR_MAP = {
  green:  { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  icon: 'text-green-600',  active: 'bg-green-600 text-white' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: 'text-indigo-600', active: 'bg-indigo-600 text-white' },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  icon: 'text-amber-600',  active: 'bg-amber-600 text-white' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-600', active: 'bg-purple-600 text-white' },
  rose:   { bg: 'bg-rose-50',   text: 'text-rose-700',   border: 'border-rose-200',   icon: 'text-rose-600',   active: 'bg-rose-600 text-white' },
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handle} className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
      {copied ? <><Check className="w-3.5 h-3.5 text-green-600" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
    </button>
  );
}

function TabStatus({ status }) {
  if (status === 'loading') return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
  if (status === 'done')    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  if (status === 'error')   return <AlertCircle className="w-4 h-4 text-red-400" />;
  return null;
}

function ResumeTipsPanel({ data }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Professional Summary</h3>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex justify-between items-start gap-4">
          <p className="text-gray-800 leading-relaxed">{data.summary}</p>
          <CopyButton text={data.summary} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tailored Bullet Points</h3>
        <div className="space-y-2">
          {data.bullets.map((b, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-start gap-4 shadow-sm">
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{b}</p>
              </div>
              <CopyButton text={b} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Skills to Add to Your Resume</h3>
        <div className="flex flex-wrap gap-2">
          {data.missingSkills.map((s, i) => (
            <span key={i} className="bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium px-3 py-1.5 rounded-full">+ {s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoverLetterPanel({ data }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Cover Letter</h3>
        <CopyButton text={data} />
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm font-serif text-gray-700 text-sm leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
        {data}
      </div>
    </div>
  );
}

function ColdEmailPanel({ data }) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject Line</span>
          <CopyButton text={data.subject} />
        </div>
        <p className="font-semibold text-gray-900">{data.subject}</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Body</span>
          <CopyButton text={data.body} />
        </div>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{data.body}</p>
      </div>
    </div>
  );
}

function InterviewPanel({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {data.questions.map((q, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-start justify-between gap-4 p-4 text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mb-1 inline-block">{q.type}</span>
                <p className="font-medium text-gray-900 text-sm leading-snug">{q.question}</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${open === i ? 'rotate-90' : ''}`} />
          </button>
          {open === i && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-2">Model Answer</p>
              <p className="text-sm text-gray-700 leading-relaxed">{q.modelAnswer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AtsPanel({ data }) {
  const color = data.score >= 80 ? 'text-green-500' : data.score >= 60 ? 'text-amber-500' : 'text-red-500';
  const barColor = data.score >= 80 ? 'bg-green-500' : data.score >= 60 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-6">
        <div className={`text-6xl font-black ${color}`}>{data.score}<span className="text-xl text-gray-300 font-normal">/100</span></div>
        <div className="flex-1">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className="font-semibold text-gray-800">ATS Match Score</span>
            <span>{data.score}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div className={`h-3 rounded-full transition-all ${barColor}`} style={{ width: `${data.score}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Based on keyword match with the job description</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">AI Feedback</h3>
        <div className="space-y-2">
          {data.feedback.map((f, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3 shadow-sm">
              <span className="text-rose-500 font-bold shrink-0">→</span>
              <p className="text-sm text-gray-700 leading-relaxed">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const JobPackage = () => {
  const { resumeData, setResumeData } = useResume();
  const [step, setStep]       = useState('form');
  const [activeTab, setActiveTab] = useState('resumeTips');
  const [statuses, setStatuses]   = useState({});
  const [results, setResults]     = useState({});
  const [globalError, setGlobalError] = useState('');

  const [showUploader, setShowUploader] = useState(true);
  const [jobTitle,     setJobTitle]     = useState('');
  const [companyName,  setCompanyName]  = useState('');
  const [jobDesc,      setJobDesc]      = useState('');
  const [fullName,     setFullName]     = useState('');
  const [email,        setEmail]        = useState('');
  const [skills,       setSkills]       = useState('');
  const [experience,   setExperience]   = useState('');
  const [education,    setEducation]    = useState(null);
  const [extractedExp, setExtractedExp] = useState([]);
  const [extractedProj, setExtractedProj] = useState([]);

  const applyResumeData = (data) => {
    if (data.fullName) setFullName(data.fullName);
    if (data.email)    setEmail(data.email);
    if (data.skills)   setSkills(data.skills);
    if (data.degree || data.university) setEducation({ degree: data.degree, university: data.university, gradYear: data.gradYear, cgpa: data.cgpa });
    if (data.experience?.length) {
      setExtractedExp(data.experience);
      const exp = data.experience[0];
      setExperience(`${exp.role || ''} at ${exp.company || ''}${exp.description ? ': ' + exp.description : ''}`);
    }
    if (data.projects?.length) setExtractedProj(data.projects);
  };

  useEffect(() => {
    if (resumeData) {
      applyResumeData(resumeData);
      setShowUploader(false);
    }
  }, [resumeData]);

  const handleResumeExtracted = (data) => {
    applyResumeData(data);
    setResumeData(data);
    setShowUploader(false);
  };

  const setStatus = (key, val) => setStatuses(prev => ({ ...prev, [key]: val }));
  const setResult = (key, val) => setResults(prev => ({ ...prev, [key]: val }));

  const handleGenerate = async () => {
    if (!jobTitle || !companyName || !jobDesc || !fullName) {
      setGlobalError('Please fill in Job Title, Company, Job Description, and your Full Name.');
      return;
    }
    setGlobalError('');
    setStep('results');
    setStatuses({ resumeTips: 'loading', coverLetter: 'loading', coldEmail: 'loading', interviewPrep: 'loading', atsScore: 'loading' });
    setResults({});

    const expArr = extractedExp.length
      ? extractedExp.map((e, i) => ({ id: i, role: e.role || '', company: e.company || '', description: e.description || '' }))
      : [{ id: 1, role: experience || 'Professional', company: companyName, description: experience }];

    const projArr = extractedProj.length
      ? extractedProj.map((p, i) => ({ id: i, title: p.title || '', description: p.description || '' }))
      : [];

    const delay = (ms) => new Promise(r => setTimeout(r, ms));

    const run = async (key, fn, retries = 2) => {
      setStatus(key, 'loading');
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const data = await fn();
          setResult(key, data);
          setStatus(key, 'done');
          return;
        } catch (err) {
          if (attempt === retries) setStatus(key, 'error');
          else await delay(1500);
        }
      }
    };

    // Stagger calls 400ms apart to avoid rate limiting on free tier
    const calls = [
      () => run('resumeTips',    () => generateResumeTips({ jobTitle, jobDescription: jobDesc, skills, experience })),
      () => run('coverLetter',   () => generateCoverLetter({ fullName, email, phone: '', linkedin: '', jobTitle, companyName, companyLocation: '', jobDescription: jobDesc, experience, skills, tone: 'Professional' })),
      () => run('coldEmail',     () => generateColdEmail({ fullName, jobTitle, companyName, recruiterName: '', skills, experience: expArr })),
      () => run('interviewPrep', () => generateInterviewQuestions({ jobTitle, jobDescription: jobDesc, skills, experience: expArr })),
      () => run('atsScore',      () => scoreResume(jobDesc, skills, expArr, projArr, education)),
    ];

    calls.forEach((fn, i) => delay(i * 400).then(fn));
  };

  const allDone   = Object.values(statuses).length === 5 && Object.values(statuses).every(s => s !== 'loading');
  const doneCount = Object.values(statuses).filter(s => s === 'done').length;

  return (
    <div className="w-full bg-[#f8f9fb] min-h-screen">
      <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-4 border border-green-200">
            <Zap className="w-4 h-4" /> One-Click Job Application Package
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Paste a job. Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">everything</span> in seconds.
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Resume bullets · Cover letter · Cold email · Interview prep · ATS score — all generated in parallel for one specific job.
          </p>
        </div>

        {globalError && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{globalError}</span>
          </div>
        )}

        {step === 'form' ? (
          /* ── FORM ── */
          <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-6">

            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">The Job</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" className="rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm" placeholder="Job Title *" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                  <input type="text" className="rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm" placeholder="Company Name *" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>
                <textarea rows="5" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white resize-none text-sm" placeholder="Paste the full job description here... *" value={jobDesc} onChange={e => setJobDesc(e.target.value)} />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Your Profile</h2>
              {showUploader ? (
                <div className="mb-4">
                  <ResumeUploader
                    onExtracted={handleResumeExtracted}
                    onDismiss={() => setShowUploader(false)}
                  />
                  <p className="text-xs text-gray-400 text-center mt-2">or fill in manually below</p>
                </div>
              ) : (
                <button onClick={() => setShowUploader(true)} className="w-full text-xs text-gray-400 hover:text-green-600 transition-colors py-1 text-center mb-3">
                  + Upload a different resume
                </button>
              )}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" className="rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm" placeholder="Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} />
                  <input type="email" className="rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm" placeholder="Your Skills: React, Python, Node.js, SQL..." value={skills} onChange={e => setSkills(e.target.value)} />
                <textarea rows="2" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white resize-none text-sm" placeholder="Brief experience summary: e.g. 2 years as Frontend Dev at TechCorp, built 3 production React apps..." value={experience} onChange={e => setExperience(e.target.value)} />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-3 active:scale-95 text-lg"
            >
              <Zap className="w-5 h-5" />
              Generate Full Application Package
            </button>

            <p className="text-xs text-gray-400 text-center">Generates 5 documents in parallel · Takes ~15 seconds</p>
          </div>

        ) : (
          /* ── RESULTS ── */
          <div>
            {/* Progress bar */}
            {!allDone && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="font-medium">Generating your package...</span>
                  <span className="font-semibold text-green-600">{doneCount}/5 complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${(doneCount / 5) * 100}%` }}></div>
                </div>
              </div>
            )}

            {allDone && (
              <div className="max-w-2xl mx-auto mb-6 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-green-800 font-semibold text-sm">Your complete job application package is ready!</p>
                <button onClick={() => { setStep('form'); setStatuses({}); setResults({}); }} className="ml-auto text-xs text-green-700 border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors">New Job</button>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {TABS.map(tab => {
                const c = COLOR_MAP[tab.color];
                const isActive = activeTab === tab.key;
                const status = statuses[tab.key];
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                      isActive ? `${c.active} border-transparent shadow-md` : `bg-white border-gray-200 text-gray-600 hover:border-gray-300`
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    <TabStatus status={status} />
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 min-h-[400px]">
              {statuses[activeTab] === 'loading' && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
                  <p className="text-gray-500 font-medium">AI is generating this section...</p>
                </div>
              )}
              {statuses[activeTab] === 'error' && (
                <div className="flex flex-col items-center justify-center h-64 gap-3 text-red-500">
                  <AlertCircle className="w-10 h-10" />
                  <p className="font-medium">Failed to generate this section. Try again.</p>
                </div>
              )}
              {statuses[activeTab] === 'done' && results[activeTab] && (
                <>
                  {activeTab === 'resumeTips'    && <ResumeTipsPanel    data={results.resumeTips} />}
                  {activeTab === 'coverLetter'   && <CoverLetterPanel   data={results.coverLetter} />}
                  {activeTab === 'coldEmail'     && <ColdEmailPanel     data={results.coldEmail} />}
                  {activeTab === 'interviewPrep' && <InterviewPanel     data={results.interviewPrep} />}
                  {activeTab === 'atsScore'      && <AtsPanel           data={results.atsScore} />}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPackage;
