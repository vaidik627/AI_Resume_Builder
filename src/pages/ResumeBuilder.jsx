import React, { useState } from 'react';
import { Plus, Trash2, Cpu, Download, AlertCircle } from 'lucide-react';
import { enhanceResumeContent } from '../utils/ai';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumeBuilder = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [aiError, setAiError] = useState('');

    const [personalInfo, setPersonalInfo] = useState({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (234) 567-8900',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe'
    });
    const [education, setEducation] = useState({
        degree: 'B.S. Computer Science',
        university: 'Stanford University',
        gradYear: '2026',
        cgpa: '3.8/4.0'
    });
    const [skills, setSkills] = useState('Python, React, Node.js, Machine Learning, Tailwind CSS');

    const [projects, setProjects] = useState([
        { id: 1, title: 'AI Resume Builder', description: 'Developed a full-stack SaaS application using React and Tailwind CSS.', technologies: 'React, Tailwind, Node' }
    ]);
    const [experience, setExperience] = useState([
        { id: 1, company: 'Tech Innovations Inc.', role: 'Software Engineer Intern', duration: 'June 2025 - Aug 2025', description: 'Engineered scalable frontend components and improved rendering performance by 25%.' }
    ]);

    const addProject = () => setProjects([...projects, { id: Date.now(), title: '', description: '', technologies: '' }]);
    const removeProject = (id) => setProjects(projects.filter(p => p.id !== id));
    const updateProject = (id, field, value) => setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));

    const addExperience = () => setExperience([...experience, { id: Date.now(), company: '', role: '', duration: '', description: '' }]);
    const removeExperience = (id) => setExperience(experience.filter(e => e.id !== id));
    const updateExperience = (id, field, value) => setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));

    const handleEnhanceWithAI = async () => {
        setIsGenerating(true);
        setAiError('');
        try {
            const result = await enhanceResumeContent({ experience, projects });

            if (result.experience?.length) {
                setExperience(prev => prev.map((exp, i) => {
                    const enhanced = result.experience.find(e => e.index === i);
                    return enhanced ? { ...exp, description: enhanced.description } : exp;
                }));
            }
            if (result.projects?.length) {
                setProjects(prev => prev.map((proj, i) => {
                    const enhanced = result.projects.find(p => p.index === i);
                    return enhanced ? { ...proj, description: enhanced.description } : proj;
                }));
            }
        } catch (err) {
            setAiError(err.message || 'AI enhancement failed. Check your API key in the .env file.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        setAiError('');
        try {
            const el = document.getElementById('resume-paper');

            // Temporarily remove the scale transform so html2canvas captures full size
            el.style.transform = 'scale(1)';
            el.style.transformOrigin = 'top left';
            await new Promise(r => setTimeout(r, 150));

            const canvas = await html2canvas(el, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false
            });

            // Restore scale
            el.style.transform = '';
            el.style.transformOrigin = '';

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = pdf.internal.pageSize.getHeight();
            const imgAspect = canvas.width / canvas.height;
            const pdfAspect = pdfW / pdfH;

            let imgW, imgH;
            if (imgAspect > pdfAspect) {
                imgW = pdfW;
                imgH = pdfW / imgAspect;
            } else {
                imgH = pdfH;
                imgW = pdfH * imgAspect;
            }

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgW, imgH);
            pdf.save(`${personalInfo.fullName || 'Resume'}_Resume.pdf`);
        } catch (err) {
            setAiError('PDF export failed. Please try again.');
            console.error(err);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="w-full bg-gray-50/50 min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">AI Resume Builder</h1>
                        <p className="text-gray-500 mt-1">Fill out the form to instantly generate a professional resume.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={handleEnhanceWithAI}
                            disabled={isGenerating || isExporting}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 px-6 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center gap-2 active:scale-95"
                        >
                            {isGenerating ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <Cpu className="w-5 h-5" />
                            )}
                            {isGenerating ? 'Enhancing...' : 'Enhance with AI'}
                        </button>
                        <button
                            onClick={handleExportPDF}
                            disabled={isGenerating || isExporting}
                            className="bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-700 border border-gray-200 font-medium py-2.5 px-6 rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95"
                        >
                            {isExporting ? (
                                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <Download className="w-5 h-5" />
                            )}
                            {isExporting ? 'Exporting...' : 'Export PDF'}
                        </button>
                    </div>
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

                        {/* Section 1: Personal Info */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Personal Details
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={personalInfo.fullName} onChange={e => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="tel" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={personalInfo.phone} onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                        <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={personalInfo.linkedin} onChange={e => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub / Portfolio</label>
                                        <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={personalInfo.github} onChange={e => setPersonalInfo({ ...personalInfo, github: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Section 2: Education */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                Education
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={education.degree} onChange={e => setEducation({ ...education, degree: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                    <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={education.university} onChange={e => setEducation({ ...education, university: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Grad Year</label>
                                        <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={education.gradYear} onChange={e => setEducation({ ...education, gradYear: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CGPA (Optional)</label>
                                        <input type="text" className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white" value={education.cgpa} onChange={e => setEducation({ ...education, cgpa: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Section 3: Skills */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                                Skills
                            </h2>
                            <textarea
                                rows="3"
                                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none"
                                placeholder="e.g. JavaScript, Python, UI/UX Design..."
                                value={skills}
                                onChange={e => setSkills(e.target.value)}
                            />
                        </section>

                        <hr className="border-gray-100" />

                        {/* Section 4: Projects */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                                    Projects
                                </h2>
                                <button type="button" onClick={addProject} className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                            <div className="space-y-4">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="group relative bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                        {projects.length > 1 && (
                                            <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="grid gap-3">
                                            <input type="text" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Project Name" value={proj.title} onChange={e => updateProject(proj.id, 'title', e.target.value)} />
                                            <input type="text" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Technologies" value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)} />
                                            <textarea rows="2" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white resize-none" placeholder="Description" value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Section 5: Experience */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
                                    Experience
                                </h2>
                                <button type="button" onClick={addExperience} className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="group relative bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                        {experience.length > 1 && (
                                            <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="grid gap-3">
                                            <input type="text" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input type="text" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Role" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} />
                                                <input type="text" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Duration" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} />
                                            </div>
                                            <textarea rows="2" className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white resize-none" placeholder="Responsibilities" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="lg:col-span-7 xl:col-span-7 sticky top-28 hidden lg:block">
                        <div className="bg-gray-200/50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center min-h-[calc(100vh-160px)]">

                            <div
                                id="resume-paper"
                                className="bg-white w-full max-w-[800px] aspect-[8.5/11] rounded-sm shadow-md border border-gray-200 p-10 font-sans text-gray-800 scale-[0.85] origin-top transform-gpu overflow-hidden"
                            >
                                {/* Header */}
                                <div className="border-b border-gray-800 pb-4 mb-4 text-center">
                                    <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900 mb-1">
                                        {personalInfo.fullName || 'Your Name'}
                                    </h1>
                                    <div className="flex flex-wrap justify-center gap-x-3 text-sm text-gray-600">
                                        {personalInfo.email && <span>{personalInfo.email}</span>}
                                        {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                                        {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                                        {personalInfo.github && <span>• {personalInfo.github}</span>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Education */}
                                    {education.degree && (
                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-2 pb-1">Education</h2>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <span className="font-semibold text-gray-900">{education.university || 'University Name'}</span>
                                                <span className="text-sm text-gray-600">{education.gradYear}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-700">{education.degree}</span>
                                                {education.cgpa && <span className="text-gray-600">CGPA: {education.cgpa}</span>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Skills */}
                                    {skills && (
                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-2 pb-1">Skills</h2>
                                            <p className="text-sm text-gray-700 leading-relaxed break-words">{skills}</p>
                                        </div>
                                    )}

                                    {/* Experience */}
                                    {experience.some(e => e.company) && (
                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-2 pb-1">Experience</h2>
                                            <div className="space-y-3">
                                                {experience.map(exp => (
                                                    <div key={`prev-exp-${exp.id}`}>
                                                        <div className="flex justify-between items-baseline mb-0.5">
                                                            <span className="font-semibold text-gray-900">{exp.role || 'Role'}</span>
                                                            <span className="text-sm text-gray-600">{exp.duration}</span>
                                                        </div>
                                                        <p className="text-sm italic text-gray-700 mb-1">{exp.company || 'Company'}</p>
                                                        {exp.description && (
                                                            <p className="text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-gray-200 whitespace-pre-line">
                                                                {exp.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Projects */}
                                    {projects.some(p => p.title) && (
                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-2 pb-1">Projects</h2>
                                            <div className="space-y-3">
                                                {projects.map(proj => (
                                                    <div key={`prev-proj-${proj.id}`}>
                                                        <div className="flex items-baseline gap-2 mb-0.5">
                                                            <span className="font-semibold text-gray-900">{proj.title || 'Project Title'}</span>
                                                            {proj.technologies && <span className="text-xs text-gray-500">| {proj.technologies}</span>}
                                                        </div>
                                                        {proj.description && (
                                                            <p className="text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-gray-200 whitespace-pre-line">
                                                                {proj.description}
                                                            </p>
                                                        )}
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
            </div>

            {/* Mobile preview note */}
            <div className="lg:hidden p-4 text-center text-gray-500 text-sm">
                Live preview is available on desktop view. Export to see the final document.
            </div>
        </div>
    );
};

export default ResumeBuilder;
