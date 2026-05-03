import React, { useState } from 'react';
import { Linkedin, Copy, Check, AlertCircle, Cpu, Plus, Trash2 } from 'lucide-react';
import { generateLinkedInSummary } from '../utils/ai';

const LinkedInOptimizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [result, setResult] = useState(null);
  const [copiedHeadline, setCopiedHeadline] = useState(false);
  const [copiedAbout, setCopiedAbout] = useState(false);

  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState([{ id: 1, role: '', company: '', description: '' }]);
  const [projects, setProjects] = useState([{ id: 1, title: '', description: '' }]);

  const addExp = () => setExperience(prev => [...prev, { id: Date.now(), role: '', company: '', description: '' }]);
  const updateExp = (id, field, value) => setExperience(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  const removeExp = (id) => setExperience(prev => prev.filter(e => e.id !== id));

  const addProj = () => setProjects(prev => [...prev, { id: Date.now(), title: '', description: '' }]);
  const updateProj = (id, field, value) => setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  const removeProj = (id) => setProjects(prev => prev.filter(p => p.id !== id));

  const handleGenerate = async () => {
    if (!fullName || !jobTitle) {
      setAiError('Please fill in your Name and Target Job Title.');
      return;
    }
    setIsGenerating(true);
    setAiError('');
    try {
      const data = await generateLinkedInSummary({ fullName, jobTitle, skills, experience, projects });
      setResult(data);
    } catch (err) {
      setAiError(err.message || 'Failed to generate LinkedIn summary.');
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">LinkedIn Optimizer</h1>
            <p className="text-gray-500 mt-1">Generate a powerful headline and "About" section to get noticed by recruiters.</p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#0077B5] hover:bg-[#006097] disabled:opacity-60 text-white font-medium py-2.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
          >
            {isGenerating ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : <Cpu className="w-5 h-5" />}
            {isGenerating ? 'Optimizing...' : 'Optimize Profile'}
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
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Your Info</h2>
              <div className="space-y-3">
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 hover:bg-white" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 hover:bg-white" placeholder="Target Job Title (e.g. Full Stack Developer)" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 hover:bg-white" placeholder="Top Skills: React, Node.js, Python..." value={skills} onChange={e => setSkills(e.target.value)} />
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Experience</h2>
                <button type="button" onClick={addExp} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id} className="relative bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                    {experience.length > 1 && (
                      <button onClick={() => removeExp(exp.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" className="rounded-lg border border-gray-200 py-2 px-3 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Role" value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} />
                      <input type="text" className="rounded-lg border border-gray-200 py-2 px-3 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Company" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
                    </div>
                    <textarea rows="2" className="w-full rounded-lg border border-gray-200 py-2 px-3 bg-white resize-none text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Key achievement/responsibility..." value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Projects</h2>
                <button type="button" onClick={addProj} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id} className="relative bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                    {projects.length > 1 && (
                      <button onClick={() => removeProj(proj.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                    <input type="text" className="w-full rounded-lg border border-gray-200 py-2 px-3 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Project Title" value={proj.title} onChange={e => updateProj(proj.id, 'title', e.target.value)} />
                    <textarea rows="2" className="w-full rounded-lg border border-gray-200 py-2 px-3 bg-white resize-none text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="What did you build and what was the impact?" value={proj.description} onChange={e => updateProj(proj.id, 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Output */}
          <div className="lg:col-span-7 sticky top-28">
            {result ? (
              <div className="space-y-4">
                {/* Headline */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-[#0077B5]" /> LinkedIn Headline
                    </h3>
                    <button onClick={() => copy(result.headline, setCopiedHeadline)} className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
                      {copiedHeadline ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                  <p className="text-gray-700 font-medium text-lg leading-snug">{result.headline}</p>
                </div>

                {/* About */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800">About Section</h3>
                    <button onClick={() => copy(result.about, setCopiedAbout)} className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
                      {copiedAbout ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{result.about}</p>
                </div>

                <p className="text-xs text-gray-400 text-center">Tip: Copy and paste directly into your LinkedIn profile settings.</p>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-16 text-center min-h-[400px]">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Linkedin className="w-8 h-8 text-[#0077B5]/40" />
                </div>
                <p className="text-gray-400 font-medium">Your optimized LinkedIn profile will appear here.</p>
                <p className="text-gray-400 text-sm mt-1 max-w-sm">Fill in your details and click "Optimize Profile".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInOptimizer;
