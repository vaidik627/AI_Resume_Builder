import React, { useState } from 'react';
import { AlignLeft, Copy, Download, Wand2, Check, AlertCircle } from 'lucide-react';
import { generateCoverLetter } from '../utils/ai';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CoverLetterGenerator = () => {
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
        length: 'Medium'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async (e) => {
        e?.preventDefault();
        setIsGenerating(true);
        setAiError('');
        try {
            const letter = await generateCoverLetter(formData);
            setGeneratedLetter(letter);
        } catch (err) {
            setAiError(err.message || 'Generation failed. Check your API key in the .env file.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            const el = document.getElementById('cover-letter-paper');

            const canvas = await html2canvas(el, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false
            });

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = pdf.internal.pageSize.getHeight();
            const ratio = canvas.width / canvas.height;
            let imgW = pdfW;
            let imgH = pdfW / ratio;

            if (imgH > pdfH) {
                imgH = pdfH;
                imgW = pdfH * ratio;
            }

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgW, imgH);
            pdf.save(`${formData.fullName || 'Cover_Letter'}_CoverLetter.pdf`);
        } catch (err) {
            setAiError('PDF download failed. Please try again.');
            console.error(err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="w-full bg-gray-50/50 min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">AI Cover Letter</h1>
                    <p className="text-gray-500 mt-1">Generate a highly personalized cover letter in seconds.</p>
                </div>

                {/* Error Banner */}
                {aiError && (
                    <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{aiError}</span>
                    </div>
                )}

                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

                    {/* Left: Form */}
                    <div className="lg:col-span-5 xl:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-8 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
                        <form onSubmit={handleGenerate} className="space-y-8">

                            {/* Target Role */}
                            <section>
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Target Role</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                            placeholder="Job Title" required
                                        />
                                        <input
                                            type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                            placeholder="Company Name" required
                                        />
                                    </div>
                                    <input
                                        type="text" name="companyLocation" value={formData.companyLocation} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                        placeholder="Company Location (optional)"
                                    />
                                    <textarea
                                        name="jobDescription" value={formData.jobDescription} onChange={handleChange}
                                        rows="4"
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none"
                                        placeholder="Paste the job description or key requirements here..." required
                                    />
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Your Profile */}
                            <section>
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Your Profile</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                            placeholder="Full Name" required
                                        />
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                            placeholder="Email" required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                            placeholder="Phone (optional)"
                                        />
                                        <input
                                            type="text" name="linkedin" value={formData.linkedin} onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                            placeholder="LinkedIn (optional)"
                                        />
                                    </div>
                                    <textarea
                                        name="experience" value={formData.experience} onChange={handleChange}
                                        rows="2"
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none"
                                        placeholder="Briefly describe your experience (e.g. 3+ years in frontend development at startups)"
                                    />
                                    <input
                                        type="text" name="skills" value={formData.skills} onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white"
                                        placeholder="Key Skills: React, Node.js, Leadership..."
                                    />
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Tone */}
                            <section>
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Letter Tone</h2>
                                <div className="flex bg-gray-100/80 p-1 rounded-xl w-full">
                                    {['Professional', 'Confident', 'Enthusiastic'].map((toneOption) => (
                                        <button
                                            key={toneOption}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, tone: toneOption }))}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.tone === toneOption ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            {toneOption}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center justify-center gap-2 active:scale-95 text-lg mt-4"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Crafting Letter...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        Generate with AI
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right: Preview */}
                    <div className="lg:col-span-7 xl:col-span-7 sticky top-28 hidden lg:block">
                        <div className="bg-gray-200/50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center min-h-[calc(100vh-160px)]">
                            {generatedLetter ? (
                                <div
                                    id="cover-letter-paper"
                                    className="bg-white w-full max-w-[800px] shadow-sm border border-gray-200 p-12 font-serif text-gray-800 text-[15px] leading-relaxed relative flex flex-col min-h-[calc(100vh-220px)] rounded-sm"
                                >
                                    <div className="flex-1 overflow-y-auto whitespace-pre-wrap pr-4 custom-scrollbar">
                                        {generatedLetter}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 p-2 rounded-lg transition-colors flex items-center gap-1.5"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                            <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                                        </button>
                                        <button
                                            onClick={handleDownloadPDF}
                                            disabled={isDownloading}
                                            className="bg-gray-50 hover:bg-gray-100 disabled:opacity-60 border border-gray-200 text-gray-600 p-2 rounded-lg transition-colors flex items-center gap-1.5"
                                        >
                                            {isDownloading ? (
                                                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <Download className="w-4 h-4" />
                                            )}
                                            <span className="text-xs font-medium">{isDownloading ? 'Saving...' : 'PDF'}</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/60 w-full max-w-[800px] aspect-[8.5/11] border border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center p-12">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                        <AlignLeft className="w-8 h-8 text-green-300" />
                                    </div>
                                    <p className="text-gray-400 font-medium text-center">Your cover letter will appear here.</p>
                                    <p className="text-gray-400 text-sm mt-1 text-center max-w-sm">Fill in the form and click "Generate with AI" to craft a personalized letter.</p>
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
