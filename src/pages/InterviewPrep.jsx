import React, { useState, useEffect } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, AlertCircle, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { generateInterviewQuestions } from '../utils/ai';
import { useResume } from '../context/ResumeContext';

const BADGE_COLORS = {
  Technical:    'bg-blue-100 text-blue-700',
  Behavioral:   'bg-purple-100 text-purple-700',
  Situational:  'bg-amber-100 text-amber-700',
  'Culture-fit':'bg-green-100 text-green-700',
};

const QuestionCard = ({ q, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-gray-50/80 transition-colors">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center mt-0.5">{index + 1}</span>
          <div>
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${BADGE_COLORS[q.type] || 'bg-gray-100 text-gray-600'}`}>{q.type}</span>
            <p className="font-medium text-gray-900 leading-snug text-sm">{q.question}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-3">Model Answer</p>
          <p className="text-sm text-gray-700 leading-relaxed">{q.modelAnswer}</p>
        </div>
      )}
    </div>
  );
};

const PracticeMode = ({ questions, onExit }) => {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const q = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  const next = () => { setCurrent(c => c + 1); setShowAnswer(false); };
  const prev = () => { setCurrent(c => c - 1); setShowAnswer(false); };

  return (
    <div className="flex flex-col gap-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to List
        </button>
        <span className="text-sm font-semibold text-gray-500">{current + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div className="bg-green-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7">
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${BADGE_COLORS[q.type] || 'bg-gray-100 text-gray-600'}`}>{q.type}</span>
        <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-6">{q.question}</h3>

        {!showAnswer ? (
          <button onClick={() => setShowAnswer(true)}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all text-sm active:scale-95">
            Reveal Model Answer
          </button>
        ) : (
          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Model Answer</p>
            <p className="text-gray-700 leading-relaxed text-sm">{q.modelAnswer}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button disabled={current === 0} onClick={prev}
          className="flex-1 py-2.5 border border-gray-200 bg-white rounded-xl font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-all text-sm flex items-center justify-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        {current < questions.length - 1 ? (
          <button onClick={next}
            className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all text-sm flex items-center justify-center gap-1.5">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={onExit}
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all text-sm">
            Finish ✓
          </button>
        )}
      </div>
    </div>
  );
};

const InterviewPrep = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [mode, setMode] = useState('list');

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState([{ id: 1, role: '', company: '', description: '' }]);

  useEffect(() => {
    if (!resumeData) return;
    if (resumeData.skills) setSkills(resumeData.skills);
    if (resumeData.experience?.length) {
      setExperience(resumeData.experience.map((e, i) => ({
        id: i + 1, role: e.role || '', company: e.company || '', description: e.description || '',
      })));
    }
  }, [resumeData]);

  const addExp    = () => setExperience(prev => [...prev, { id: Date.now(), role: '', company: '', description: '' }]);
  const updateExp = (id, field, val) => setExperience(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  const removeExp = (id) => setExperience(prev => prev.filter(e => e.id !== id));

  const handleGenerate = async (append = false) => {
    if (!jobTitle || !jobDescription) {
      setAiError('Please fill in the Job Title and Job Description.');
      return;
    }
    setIsGenerating(true);
    setAiError('');
    try {
      const result = await generateInterviewQuestions({ jobTitle, jobDescription, skills, experience });
      const newQs = result.questions || [];
      if (append) {
        setQuestions(prev => [...prev, ...newQs]);
      } else {
        setQuestions(newQs);
        setMode('list');
      }
    } catch (err) {
      setAiError(err.message || 'Failed to generate questions.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fb] min-h-screen">
      <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">AI Interview Prep</h1>
            <p className="text-gray-500 mt-1 text-sm">Generate tailored interview questions with model answers based on your profile.</p>
            {resumeData && (
              <div className="mt-2 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Skills &amp; experience auto-filled · Add job title &amp; description to generate
              </div>
            )}
          </div>
          <button onClick={() => handleGenerate(false)} disabled={isGenerating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center gap-2 active:scale-95 text-sm shrink-0">
            {isGenerating
              ? <><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating...</>
              : <><Sparkles className="w-4 h-4" />Generate Questions</>
            }
          </button>
        </div>

        {aiError && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /><span>{aiError}</span>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left: Form — no fixed height, page scrolls */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-6">

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Target Role</h2>
              <div className="space-y-3">
                <input type="text"
                  className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                  placeholder="Job Title *"
                  value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                <textarea rows="5"
                  className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white resize-none text-sm"
                  placeholder="Paste the job description here..."
                  value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Your Skills</h2>
              <input type="text"
                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                placeholder="React, Node.js, Python, SQL..."
                value={skills} onChange={e => setSkills(e.target.value)} />
            </section>

            <hr className="border-gray-100" />

            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Experience</h2>
                <button type="button" onClick={addExp} className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">+ Add</button>
              </div>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id} className="relative bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                    {experience.length > 1 && (
                      <button onClick={() => removeExp(exp.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors text-xs">✕</button>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" className="rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-400 bg-white text-sm" placeholder="Role" value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} />
                      <input type="text" className="rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-400 bg-white text-sm" placeholder="Company" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
                    </div>
                    <textarea rows="2" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-400 bg-white resize-none text-sm" placeholder="Key responsibilities..." value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Output — sticky, internal scroll */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm" style={{ maxHeight: 'calc(100vh - 130px)', overflowY: 'auto' }} >
              {mode === 'practice' && questions.length > 0 ? (
                <div className="p-6">
                  <PracticeMode questions={questions} onExit={() => setMode('list')} />
                </div>
              ) : questions.length > 0 ? (
                <div className="p-6 space-y-3">
                  {/* Header row */}
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-gray-800 text-sm">{questions.length} Questions</span>
                      <span className="text-xs text-gray-400">· Click any to reveal answer</span>
                    </div>
                    <button
                      onClick={() => { setMode('practice'); }}
                      className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95">
                      Practice Mode →
                    </button>
                  </div>

                  {/* Question list */}
                  {questions.map((q, i) => <QuestionCard key={i} q={q} index={i} />)}

                  {/* Generate More */}
                  <button
                    onClick={() => handleGenerate(true)}
                    disabled={isGenerating}
                    className="w-full mt-2 py-3 border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50/50 text-gray-500 hover:text-green-700 font-semibold rounded-xl transition-all text-sm disabled:opacity-50">
                    {isGenerating ? 'Generating...' : '+ Generate 5 More Questions'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-16 text-center min-h-[400px]">
                  <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-7 h-7 text-green-300" />
                  </div>
                  <p className="text-gray-500 font-semibold">Questions will appear here</p>
                  <p className="text-gray-400 text-sm mt-1 max-w-xs">Fill in the job details and click "Generate Questions" above</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
