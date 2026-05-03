import React, { useState, useEffect } from 'react';
import { AlignLeft, Copy, Download, Wand2, Check, AlertCircle } from 'lucide-react';
import { generateCoverLetter } from '../utils/ai';
import { useResume } from '../context/ResumeContext';
import jsPDF from 'jspdf';

const CoverLetterGenerator = () => {
    const { resumeData } = useResume();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [copied, setCopied] = useState(false);
    const [aiError, setAiError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        jobTitle: '',
        companyName: '',
        companyLocation: '',
        jobDescription: '',
        skills: '',
        experience: '',
        tone: 'Professional',
    });

    useEffect(() => {
        if (!resumeData) return;
        const expSummary = resumeData.experience?.length
            ? resumeData.experience.map(e => `${e.role || ''}${e.company ? ' at ' + e.company : ''}${e.description ? ': ' + e.description : ''}`).join('\n')
            : '';
        setFormData(prev => ({
            ...prev,
            fullName:   resumeData.fullName  || prev.fullName,
            email:      resumeData.email     || prev.email,
            phone:      resumeData.phone     || prev.phone,
            linkedin:   resumeData.linkedin  || prev.linkedin,
            skills:     resumeData.skills    || prev.skills,
            experience: expSummary           || prev.experience,
        }));
    }, [resumeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setAiError('');
        try {
            const letter = await generateCoverLetter(formData);
            setGeneratedLetter(letter);
        } catch (err) {
            setAiError(err.message || 'Generation failed. Check your API key.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadPDF = () => {
        setIsDownloading(true);
        try {
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
            const pageWidth  = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin  = 72;
            const maxWidth = pageWidth - margin * 2;
            let y = margin;

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);

            const lines = pdf.splitTextToSize(generatedLetter, maxWidth);
            lines.forEach(line => {
                if (y > pageHeight - margin) {
                    pdf.addPage();
                    y = margin;
                }
                pdf.text(line, margin, y);
                y += 17;
            });

            pdf.save(`${formData.fullName || 'Cover_Letter'}_CoverLetter.pdf`);
        } catch (err) {
            setAiError('PDF download failed. Please try again.');
            console.error(err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="w-full bg-[#f8f9fb] min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">AI Cover Letter</h1>
                        <p className="text-gray-500 mt-1 text-sm">Generate a highly personalized cover letter in seconds.</p>
                        {resumeData && (
                            <div className="mt-2 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Profile auto-filled · Only job description needed
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center gap-2 active:scale-95 text-sm shrink-0"
                    >
                        {isGenerating ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : <Wand2 className="w-4 h-4" />}
                        {isGenerating ? 'Crafting Letter...' : 'Generate with AI'}
                    </button>
                </div>

                {/* Error Banner */}
                {aiError && (
                    <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{aiError}</span>
                    </div>
                )}

                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

                    {/* Left: Form — no fixed height, page scrolls */}
                    <div className="lg:col-span-5 bg-white border border-gray-200/60 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-7">

                        {/* Target Role */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Target Role</h2>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                        placeholder="Job Title *" />
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                        placeholder="Company Name *" />
                                </div>
                                <input type="text" name="companyLocation" value={formData.companyLocation} onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                    placeholder="Company Location (optional)" />
                                <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}
                                    rows="5"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white resize-none text-sm"
                                    placeholder="Paste the job description here..." />
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Your Profile */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Your Profile</h2>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                        placeholder="Full Name *" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                        placeholder="Email *" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                        placeholder="Phone (optional)" />
                                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                        placeholder="LinkedIn (optional)" />
                                </div>
                                <textarea name="experience" value={formData.experience} onChange={handleChange}
                                    rows="3"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white resize-none text-sm"
                                    placeholder="Briefly describe your experience..." />
                                <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 hover:bg-white text-sm"
                                    placeholder="Key Skills: React, Node.js, Leadership..." />
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Tone */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Letter Tone</h2>
                            <div className="flex bg-gray-100/80 p-1 rounded-xl w-full">
                                {['Professional', 'Confident', 'Enthusiastic'].map((t) => (
                                    <button key={t} type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, tone: t }))}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.tone === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >{t}</button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Preview — sticky, internal scroll for long letters */}
                    <div className="lg:col-span-7 sticky top-28 hidden lg:block">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200/60 p-6 rounded-2xl border border-gray-200/60" style={{ maxHeight: 'calc(100vh - 130px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {generatedLetter ? (
                                <>
                                    {/* Action bar */}
                                    <div className="flex items-center justify-between mb-4 shrink-0">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Preview</p>
                                        <div className="flex gap-2">
                                            <button onClick={handleCopy}
                                                className="flex items-center gap-1.5 text-xs border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                                                {copied ? <><Check className="w-3.5 h-3.5 text-green-600" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                                            </button>
                                            <button onClick={handleDownloadPDF} disabled={isDownloading}
                                                className="flex items-center gap-1.5 text-xs border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                                                {isDownloading
                                                    ? <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    : <Download className="w-3.5 h-3.5" />}
                                                {isDownloading ? 'Saving...' : 'PDF'}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Letter content */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-8 overflow-y-auto custom-scrollbar flex-1 font-serif text-gray-800 text-[14.5px] leading-relaxed whitespace-pre-wrap shadow-sm">
                                        {generatedLetter}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                                        <AlignLeft className="w-7 h-7 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-semibold">Your cover letter will appear here</p>
                                    <p className="text-gray-400 text-sm mt-1 max-w-xs">Fill in the form and click "Generate with AI" above</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterGenerator;
