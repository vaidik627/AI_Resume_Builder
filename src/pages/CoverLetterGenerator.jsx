import React, { useState } from 'react';
import {
    Briefcase,
    AlignLeft,
    PenTool,
    Settings2,
    Copy,
    Download,
    RefreshCcw,
    Wand2,
    Check
} from 'lucide-react';

const CoverLetterGenerator = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [copied, setCopied] = useState(false);

    // Form State
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

    const handleGenerate = (e) => {
        e?.preventDefault();
        setIsGenerating(true);

        // Mock API call to simulate AI generation
        setTimeout(() => {
            const date = new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            const template = `${formData.fullName || '[Your Name]'}\n${formData.email || '[Your Email]'}\n${formData.phone || '[Your Phone]'}\n${formData.linkedin || ''}\n\n${date}\n\nHiring Manager\n${formData.companyName || '[Company Name]'}\n${formData.companyLocation || '[Company Location]'}\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the ${formData.jobTitle || '[Job Title]'} position at ${formData.companyName || '[Company Name]'}. With a proven track record described in my experience: "${formData.experience || 'Working in similar roles'}", and my expertise in ${formData.skills || '[Key Skills]'}, I am confident in my ability to make an immediate impact on your team.\n\nYour organization’s background aligns perfectly with my professional goals and values. The requirements outlined in the job description present exactly the kind of challenges I excel at solving. I thrive in dynamic environments and am eager to bring my confident, ${formData.tone.toLowerCase()} approach to ${formData.companyName || '[Company Name]'}.\n\nI would welcome the opportunity to discuss how my background, skills, and certifications will be beneficial to your organization. Thank you for your time and consideration. I look forward to hearing from you soon.\n\nSincerely,\n\n${formData.fullName || '[Your Name]'}`;

            setGeneratedLetter(template);
            setIsGenerating(false);
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full bg-gray-50/50 min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">AI Cover Letter</h1>
                        <p className="text-gray-500 mt-1">Generate a highly personalized cover letter in seconds.</p>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

                    {/* Left Side: Input Form */}
                    <div className="lg:col-span-5 xl:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-8 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
                        <form onSubmit={handleGenerate} className="space-y-8">

                            {/* Section 1: Personal Target */}
                            <section>
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    Target Role
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" placeholder="Job Title" required />
                                        </div>
                                        <div>
                                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" placeholder="Company Name" required />
                                        </div>
                                    </div>
                                    <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none" placeholder="Paste the job description or requirements here..." required></textarea>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Section 2: Your Profile */}
                            <section>
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    Your Profile
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" placeholder="Full Name" required />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" placeholder="Email" required />
                                    </div>
                                    <textarea name="experience" value={formData.experience} onChange={handleChange} rows="2" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none" placeholder="Briefly summarize your experience (e.g. 5+ years in frontend development)"></textarea>
                                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" placeholder="Key Skills: React, Node.js, Leadership..." />
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Section 3: Configuration */}
                            <section>
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    Letter Tone
                                </h2>

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

                    {/* Right Side: Document Editor Preview */}
                    <div className="lg:col-span-7 xl:col-span-7 sticky top-28 hidden lg:block">
                        <div className="bg-gray-200/50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center min-h-[calc(100vh-160px)] relative">

                            {/* Editor Toolbar (Decorative) */}
                            <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 rounded-t-2xl flex items-center justify-between px-6 z-10 hidden">
                                <span className="font-medium text-gray-500 text-sm">Document.pdf</span>
                            </div>

                            {generatedLetter ? (
                                <div className="bg-white w-full max-w-[800px] shadow-sm border border-gray-200 p-12 font-serif text-gray-800 text-[15px] leading-relaxed relative flex flex-col h-[calc(100vh-220px)] rounded-sm">
                                    <div className="flex-1 overflow-y-auto whitespace-pre-wrap pr-4 custom-scrollbar">
                                        {generatedLetter}
                                    </div>

                                    {/* Action Buttons inside Document */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 p-2 rounded-lg transition-colors flex items-center gap-1.5"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                            <span className="text-xs font-medium">{copied ? 'Copied' : 'Copy'}</span>
                                        </button>
                                        <button
                                            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 p-2 rounded-lg transition-colors flex items-center gap-1.5"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span className="text-xs font-medium">PDF</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/60 w-full max-w-[800px] aspect-[8.5/11] border border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center p-12">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                        <AlignLeft className="w-8 h-8 text-green-300" />
                                    </div>
                                    <p className="text-gray-400 font-medium text-center">Your cover letter will be generated here.</p>
                                    <p className="text-gray-400 text-sm mt-1 text-center max-w-sm">Use the form on the left to provide details and our AI will craft a perfect letter.</p>
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
