import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, AlertCircle, Cpu, Plus, Trash2 } from 'lucide-react';
import { generateColdEmail } from '../utils/ai';
import { useResume } from '../context/ResumeContext';

const ColdEmailGenerator = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [result, setResult] = useState(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState([{ id: 1, role: '', company: '' }]);

  useEffect(() => {
    if (!resumeData) return;
    if (resumeData.fullName) setFullName(resumeData.fullName);
    if (resumeData.skills)   setSkills(resumeData.skills);
    if (resumeData.experience?.length) {
      setExperience(resumeData.experience.map((e, i) => ({
        id: i + 1,
        role: e.role || '',
        company: e.company || '',
      })));
    }
  }, [resumeData]);

  const addExp = () => setExperience(prev => [...prev, { id: Date.now(), role: '', company: '' }]);
  const updateExp = (id, field, value) => setExperience(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  const removeExp = (id) => setExperience(prev => prev.filter(e => e.id !== id));

  const handleGenerate = async () => {
    if (!fullName || !jobTitle || !companyName) {
      setAiError('Please fill in your Name, Target Job Title, and Company Name.');
      return;
    }
    setIsGenerating(true);
    setAiError('');
    try {
      const data = await generateColdEmail({ fullName, jobTitle, companyName, recruiterName, skills, experience });
      setResult(data);
    } catch (err) {
      setAiError(err.message || 'Failed to generate cold email.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="w-full bg-[#f8f9fb] min-h-screen">
      <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Cold Email Generator</h1>
            <p className="text-gray-500 mt-1">Write high-converting cold emails to recruiters and hiring managers in seconds.</p>
            {resumeData && (
              <div className="mt-2 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Profile auto-filled · Just add company &amp; job title
              </div>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 px-6 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center gap-2 active:scale-95"
          >
            {isGenerating ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : <Cpu className="w-5 h-5" />}
            {isGenerating ? 'Writing Email...' : 'Write Cold Email'}
          </button>
        </div>

        {aiError && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{aiError}</span>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left: Form */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-6">

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Target</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" className="rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white" placeholder="Company Name *" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                  <input type="text" className="rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white" placeholder="Job Title *" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white" placeholder="Recruiter / Hiring Manager Name (optional)" value={recruiterName} onChange={e => setRecruiterName(e.target.value)} />
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Your Profile</h2>
              <div className="space-y-3">
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white" placeholder="Your Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} />
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white" placeholder="Top Skills: React, Python, Machine Learning..." value={skills} onChange={e => setSkills(e.target.value)} />
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Experience</h2>
                <button type="button" onClick={addExp} className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>
              <div className="space-y-2">
                {experience.map(exp => (
                  <div key={exp.id} className="relative flex gap-2 items-center">
                    <input type="text" className="flex-1 rounded-lg border border-gray-200 py-2 px-3 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-400 text-sm" placeholder="Role" value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} />
                    <input type="text" className="flex-1 rounded-lg border border-gray-200 py-2 px-3 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-400 text-sm" placeholder="Company" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
                    {experience.length > 1 && (
                      <button onClick={() => removeExp(exp.id)} className="text-gray-400 hover:text-red-500 shrink-0"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Email Preview */}
          <div className="lg:col-span-7 sticky top-28">
            {result ? (
              <div className="space-y-4">
                {/* Subject */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject Line</span>
                    <button onClick={() => copy(result.subject, setCopiedSubject)} className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
                      {copiedSubject ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                  <p className="font-semibold text-gray-900">{result.subject}</p>
                </div>

                {/* Body */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Body</span>
                    <button onClick={() => copy(result.body, setCopiedBody)} className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
                      {copiedBody ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{result.body}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center">Tip: Personalize the email further before sending. Always proofread!</p>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-16 text-center min-h-[400px]">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-green-300" />
                </div>
                <p className="text-gray-400 font-medium">Your cold email will appear here.</p>
                <p className="text-gray-400 text-sm mt-1 max-w-sm">Fill in the details on the left and click "Write Cold Email".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdEmailGenerator;
