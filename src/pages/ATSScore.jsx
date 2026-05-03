import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, Upload, FileText, XCircle } from 'lucide-react';
import { scoreResumeFromText } from '../utils/ai';
import { extractTextFromPDF } from '../utils/pdfParser';

const ScoreGauge = ({ score }) => {
  const color = score >= 75 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';
  const bgColor = score >= 75 ? '#dcfce7' : score >= 50 ? '#fef3c7' : '#fee2e2';
  const label = score >= 75 ? 'Strong Match' : score >= 50 ? 'Moderate Match' : 'Weak Match';
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-gray-900">{score}</span>
          <span className="text-xs text-gray-400 font-medium">/100</span>
        </div>
      </div>
      <span className="text-sm font-bold px-4 py-1.5 rounded-full" style={{ color, backgroundColor: bgColor }}>{label}</span>
    </div>
  );
};

const BreakdownBar = ({ label, value, max }) => {
  const pct = Math.round((value / max) * 100);
  const color = pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium text-gray-600">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
};

const ATSScore = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setIsParsing(true);
    setError('');
    setResult(null);
    try {
      const text = await extractTextFromPDF(file);
      setResumeText(text);
    } catch {
      setError('Failed to parse PDF. Please try another file.');
      setResumeFile(null);
    } finally {
      setIsParsing(false);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setResumeText('');
    setResult(null);
  };

  const handleScore = async () => {
    if (!jobDescription.trim()) { setError('Please paste a job description.'); return; }
    if (!resumeText.trim()) { setError('Please upload your resume PDF first.'); return; }
    setIsScoring(true);
    setError('');
    setResult(null);
    try {
      const data = await scoreResumeFromText(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to score resume.');
    } finally {
      setIsScoring(false);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fb] min-h-screen">
      <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">ATS Score Checker</h1>
            <p className="text-gray-500 mt-1 text-sm">Upload your resume and paste a job description — get a real ATS score with keyword analysis.</p>
          </div>
          <button
            onClick={handleScore}
            disabled={isScoring || isParsing || !resumeFile || !jobDescription.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center gap-2 active:scale-95 text-sm shrink-0"
          >
            {isScoring
              ? <><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Analyzing...</>
              : <><TrendingUp className="w-4 h-4" />Check ATS Score</>
            }
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /><span>{error}</span>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left: Inputs */}
          <div className="lg:col-span-5 space-y-5 mb-8 lg:mb-0">

            {/* Resume Upload */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">1. Upload Resume (PDF)</h2>
              {!resumeFile ? (
                <label className="cursor-pointer flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50/40 rounded-xl p-10 transition-all">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">Click to upload your resume</p>
                    <p className="text-xs text-gray-400 mt-1">PDF format only</p>
                  </div>
                  <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                </label>
              ) : (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <FileText className="w-5 h-5 text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{resumeFile.name}</p>
                    <p className="text-xs text-green-600">{isParsing ? 'Parsing...' : 'Resume parsed successfully'}</p>
                  </div>
                  <button onClick={removeFile} className="text-gray-400 hover:text-red-500 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">2. Paste Job Description</h2>
              <textarea rows="10"
                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white resize-none text-sm"
                placeholder="Paste the full job description here — the more detail, the more accurate the score..."
                value={jobDescription} onChange={e => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm" style={{ maxHeight: 'calc(100vh - 130px)', overflowY: 'auto' }}>
              {result ? (
                <div className="p-7 space-y-7">

                  {/* Score Gauge */}
                  <div className="flex flex-col items-center pt-2">
                    <ScoreGauge score={result.score} />
                  </div>

                  {/* Score Breakdown */}
                  {result.breakdown && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Score Breakdown</h3>
                      <div className="space-y-3">
                        <BreakdownBar label="Keyword Match" value={result.breakdown.keywords ?? 0} max={40} />
                        <BreakdownBar label="Required Skills" value={result.breakdown.skills ?? 0} max={25} />
                        <BreakdownBar label="Experience Relevance" value={result.breakdown.experience ?? 0} max={20} />
                        <BreakdownBar label="Education & Certifications" value={result.breakdown.education ?? 0} max={10} />
                        <BreakdownBar label="Quantified Achievements" value={result.breakdown.achievements ?? 0} max={5} />
                      </div>
                    </div>
                  )}

                  <hr className="border-gray-100" />

                  {/* Keywords */}
                  <div className="grid grid-cols-2 gap-4">
                    {result.matchedKeywords?.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">Matched Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.matchedKeywords.map((kw, i) => (
                            <span key={i} className="text-xs bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded-full font-medium">{kw}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.missingKeywords?.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Missing Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.missingKeywords.map((kw, i) => (
                            <span key={i} className="text-xs bg-red-50 border border-red-200 text-red-600 px-2 py-0.5 rounded-full font-medium">{kw}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="border-gray-100" />

                  {/* Strengths */}
                  {result.strengths?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What's Working</h3>
                      <div className="space-y-2">
                        {result.strengths.map((s, i) => (
                          <div key={i} className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Improvements */}
                  {result.improvements?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What to Fix</h3>
                      <div className="space-y-2">
                        {result.improvements.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5">
                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-16 text-center min-h-[500px]">
                  <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-7 h-7 text-green-300" />
                  </div>
                  <p className="text-gray-600 font-semibold text-base">Real ATS Analysis</p>
                  <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">Upload your resume PDF and paste a job description to get an honest score with keyword breakdown</p>
                  <div className="mt-6 space-y-2 text-left w-full max-w-xs">
                    {['Keyword match analysis', 'Missing skills detection', 'Score breakdown by category', 'Actionable improvements'].map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSScore;
