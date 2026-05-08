import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Download, AlertCircle } from 'lucide-react';
import { enhanceResumeContent } from '../utils/ai';
import ResumeUploader from '../components/ResumeUploader';
import TemplateGallery from '../components/TemplateGallery';
import ResumePreview from '../components/ResumePreview';
import { useResume } from '../context/ResumeContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Input = ({ ...props }) => (
    <input className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white text-sm" {...props} />
);

const ResumeBuilder = () => {
    const { setResumeData } = useResume();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [aiError, setAiError] = useState('');
    const [showUploader, setShowUploader] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(10);
    const PREVIEW_ZOOM = 0.88;

    const [personalInfo, setPersonalInfo] = useState({
        fullName: 'Prakash Choudhary',
        email: 'choudharyjiprakash@gmail.com',
        phone: '+91-8827737775',
        location: 'Indore, Madhya Pradesh',
        linkedin: 'linkedin.com/in/prakash88277',
        github: 'github.com/Prakash88277',
    });

    const [summary, setSummary] = useState('I am a B.Tech CSE student specializing in Data Science with IBM at SVVV, with hands-on experience in Python backend development, data processing, and API integration. Skilled in Python, SQL, and data analysis, with a solid foundation in algorithms and backend logic design. As a National Finalist in the IBM Pan India Hackathon, I showcased strong problem-solving, adaptability, and teamwork.');

    const [education, setEducation] = useState([
        { id: 1, degree: 'Bachelor of Technology (B.Tech), CSE with Data Science (IBM)', university: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore', gradYear: '2022 – 2026', cgpa: '8.26 / 10' },
        { id: 2, degree: 'Class 12th, M.P. Board', university: 'Mahavir Bal Mandir H.S. School', gradYear: '2021 – 2022', cgpa: '60.80%' },
        { id: 3, degree: 'Class 10th, M.P. Board', university: 'Mahavir Bal Mandir H.S. School', gradYear: '2019 – 2020', cgpa: '65.25%' },
    ]);

    const [skillCategories, setSkillCategories] = useState([
        { id: 1, category: 'Programming', items: 'Python, SQL, Java (basic)' },
        { id: 2, category: 'Backend', items: 'Fast-API, Pydantic, MySQL, MongoDB, Firebase' },
        { id: 3, category: 'ML/DS Skills', items: 'Pandas, NumPy, Matplotlib, Scikit-learn, Data Preprocessing' },
        { id: 4, category: 'Automation Platforms', items: 'n8n, Make.com, Zapier' },
        { id: 5, category: 'Tools', items: 'VS Code, Git/GitHub, Postman, JSON' },
        { id: 6, category: 'AI Tools', items: 'Antigravity, Cursor, Claude, Trae' },
        { id: 7, category: 'Soft Skills', items: 'Problem Solving, Communication, Team Collaboration' },
        { id: 8, category: 'Core CS Skills', items: 'OOP, DSA, Debugging' },
    ]);

    const [projects, setProjects] = useState([
        { id: 1, title: 'Resume-Based Job Recommendation System', technologies: 'Python, n8n, BeautifulSoup, REST API, Pandas, JSON', description: 'Extracted skills from uploaded resumes and recommended jobs using web scraping. Job matching using n8n and REST APIs.' },
        { id: 2, title: 'Supermarket Spending Prediction', technologies: 'Flask, Scikit-learn, Pandas, NumPy, Pickle', description: 'Built an ML model to predict total customer spending using features like age, weather, and membership. Integrated the trained model in a Flask web app for real-time predictions.' },
        { id: 3, title: 'Everything Inventory App', technologies: 'Java, Firebase, Data Flow Design', description: 'Developed an Android inventory management system with real-time sync, authentication, and CRUD operations.' },
    ]);

    const [experience, setExperience] = useState([
        { id: 1, company: 'InternPe', role: 'Intern', duration: 'Jul 2024', location: 'Indore, Madhya Pradesh (Remote)', description: 'Built Python-based applications including a digital clock, Tic-Tac-Toe, Snake game, and Connect Four game.\nImproved debugging, modular development, and clean coding practices.\nStrengthened foundations in logic building and version control.' },
    ]);

    const [certifications, setCertifications] = useState('IBM: Python 101 for Data Science, Data Analysis with Python, SQL and Relational Databases 101, Data Visualization with Cognos\nNPTEL: Google Cloud Computing Foundations, Design and Analysis of Algorithms\nAWS Academy Graduate — Cloud Web Application Builder\nMongoDB: Relational to Document Model');

    const [achievements, setAchievements] = useState('National Finalist (C++/Java Track) — IBM Pan India Hackathon, SVYASA Bengaluru (Aug 2025).\nEarned Google Cloud Arcade rewards (Seahorse T-shirt, Backpack, Charging Kit).\nCompleted 100+ LeetCode problems in 2 months.');

    // Education
    const addEducation = () => setEducation([...education, { id: Date.now(), degree: '', university: '', gradYear: '', cgpa: '' }]);
    const removeEducation = (id) => setEducation(education.filter(e => e.id !== id));
    const updateEducation = (id, f, v) => setEducation(education.map(e => e.id === id ? { ...e, [f]: v } : e));

    // Skills
    const addSkillCategory = () => setSkillCategories([...skillCategories, { id: Date.now(), category: '', items: '' }]);
    const removeSkillCategory = (id) => setSkillCategories(skillCategories.filter(s => s.id !== id));
    const updateSkillCategory = (id, f, v) => setSkillCategories(skillCategories.map(s => s.id === id ? { ...s, [f]: v } : s));

    // Projects
    const addProject = () => setProjects([...projects, { id: Date.now(), title: '', technologies: '', description: '' }]);
    const removeProject = (id) => setProjects(projects.filter(p => p.id !== id));
    const updateProject = (id, f, v) => setProjects(projects.map(p => p.id === id ? { ...p, [f]: v } : p));

    // Experience
    const addExperience = () => setExperience([...experience, { id: Date.now(), company: '', role: '', duration: '', location: '', description: '' }]);
    const removeExperience = (id) => setExperience(experience.filter(e => e.id !== id));
    const updateExperience = (id, f, v) => setExperience(experience.map(e => e.id === id ? { ...e, [f]: v } : e));

    const handleResumeExtracted = (data) => {
        if (data.fullName || data.email) {
            setPersonalInfo({ fullName: data.fullName || '', email: data.email || '', phone: data.phone || '', location: data.location || '', linkedin: data.linkedin || '', github: data.github || '' });
        }
        if (data.summary) setSummary(data.summary);
        if (data.degree || data.university) {
            setEducation([{ id: 1, degree: data.degree || '', university: data.university || '', gradYear: data.gradYear || '', cgpa: data.cgpa || '' }]);
        }
        if (data.skills) {
            setSkillCategories([{ id: 1, category: 'Technical Skills', items: data.skills }]);
        }
        if (data.experience?.length) {
            setExperience(data.experience.map((e, i) => ({ id: Date.now() + i, company: e.company || '', role: e.role || '', duration: e.duration || '', location: e.location || '', description: e.description || '' })));
        }
        if (data.projects?.length) {
            setProjects(data.projects.map((p, i) => ({ id: Date.now() + i + 100, title: p.title || '', technologies: p.technologies || '', description: p.description || '' })));
        }
        if (data.certifications) setCertifications(data.certifications);
        if (data.achievements) setAchievements(data.achievements);
        setShowUploader(false);
        setResumeData(data);
    };

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
        const exportPaper = document.getElementById('export-resume-paper');
        if (!exportPaper) {
            setAiError('Export target not found.');
            setIsExporting(false);
            return;
        }
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        try {
            const rect = exportPaper.getBoundingClientRect();
            const canvas = await html2canvas(exportPaper, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: 794,
                height: exportPaper.scrollHeight,
                scrollX: -rect.left,
                scrollY: -rect.top,
                onclone: (clonedDoc) => {
                    clonedDoc.querySelectorAll('link[rel="stylesheet"], style').forEach(n => n.remove());
                    // html2canvas miscalculates height of flex-wrap:wrap containers — rows collapse on top of each other.
                    // Converting to block + inline-block children uses the text layout engine instead, which html2canvas handles correctly.
                    clonedDoc.querySelectorAll('*').forEach(el => {
                        if (el.style && el.style.flexWrap === 'wrap') {
                            el.style.display = 'block';
                            el.style.flexWrap = '';
                            Array.from(el.children).forEach(child => {
                                child.style.display = 'inline-block';
                                child.style.marginRight = '4px';
                                child.style.marginBottom = '4px';
                            });
                        }
                    });
                },
            });
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = pdf.internal.pageSize.getHeight();
            const imgData = canvas.toDataURL('image/png');
            const imgH = (canvas.height / canvas.width) * pdfW;

            // Split across pages if content exceeds one A4 page
            let remaining = imgH;
            let yOffset = 0;
            while (remaining > 0) {
                if (yOffset > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, -yOffset, pdfW, imgH);
                yOffset += pdfH;
                remaining -= pdfH;
            }

            pdf.save(`${personalInfo.fullName || 'Resume'}_Resume.pdf`);
        } catch (err) {
            setAiError(`PDF export failed: ${err?.message || 'Unknown error'}`);
        } finally {
            setIsExporting(false);
        }
    };

    const previewProps = { templateId: selectedTemplate, personalInfo, summary, education, skillCategories, experience, projects, certifications, achievements };

    return (
        <>
        <div className="w-full bg-[#f8f9fb] min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">

                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Resume Builder</h1>
                        <p className="text-gray-500 mt-1 text-sm">Fill in your details — live preview updates as you type.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button onClick={handleEnhanceWithAI} disabled={isGenerating || isExporting}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center gap-2 active:scale-95 text-sm">
                            {isGenerating
                                ? <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                : <Sparkles className="w-4 h-4" />}
                            {isGenerating ? 'Enhancing...' : 'Enhance with AI'}
                        </button>
                        <button onClick={handleExportPDF} disabled={isGenerating || isExporting}
                            className="bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-700 border border-gray-200 font-semibold py-2.5 px-5 rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95 text-sm">
                            {isExporting
                                ? <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                : <Download className="w-4 h-4" />}
                            {isExporting ? 'Exporting...' : 'Export PDF'}
                        </button>
                    </div>
                </div>

                {aiError && (
                    <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{aiError}</span>
                    </div>
                )}

                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

                    {/* ── Left: Form ── */}
                    <div className="lg:col-span-5 xl:col-span-5 bg-white border border-gray-200/60 rounded-2xl shadow-sm p-6 mb-8 lg:mb-0 space-y-7">

                        {showUploader && <ResumeUploader onExtracted={handleResumeExtracted} onDismiss={() => setShowUploader(false)} />}
                        {!showUploader && (
                            <button onClick={() => setShowUploader(true)} className="w-full text-xs text-gray-400 hover:text-green-600 transition-colors py-1 text-center">
                                + Upload a different resume
                            </button>
                        )}

                        <TemplateGallery selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} />

                        {/* 1 · Personal Info */}
                        <section>
                            <SectionTitle n="1" label="Personal Details" />
                            <div className="grid gap-4">
                                <div>
                                    <Label>Full Name</Label>
                                    <Input value={personalInfo.fullName} onChange={e => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} placeholder="Prakash Choudhary" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><Label>Email</Label><Input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} /></div>
                                    <div><Label>Phone</Label><Input type="tel" value={personalInfo.phone} onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })} /></div>
                                </div>
                                <div>
                                    <Label>Location <span className="text-gray-400 font-normal">(optional)</span></Label>
                                    <Input value={personalInfo.location} onChange={e => setPersonalInfo({ ...personalInfo, location: e.target.value })} placeholder="Indore, Madhya Pradesh" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><Label>LinkedIn</Label><Input value={personalInfo.linkedin} onChange={e => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} /></div>
                                    <div><Label>GitHub / Portfolio</Label><Input value={personalInfo.github} onChange={e => setPersonalInfo({ ...personalInfo, github: e.target.value })} /></div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 2 · Objective / Summary */}
                        <section>
                            <SectionTitle n="2" label="Objective / Summary" optional />
                            <textarea
                                rows="3"
                                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none text-sm"
                                placeholder="Brief statement about your background, skills, and career goals..."
                                value={summary}
                                onChange={e => setSummary(e.target.value)}
                            />
                        </section>

                        <hr className="border-gray-100" />

                        {/* 3 · Education */}
                        <section>
                            <SectionTitle n="3" label="Education" onAdd={addEducation} addLabel="Add" />
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id} className="relative bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                        {education.length > 1 && (
                                            <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        )}
                                        <div className="grid gap-2.5">
                                            <Input placeholder="Degree / Certificate (e.g. B.Tech CSE with Data Science)" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                                            <Input placeholder="Institution Name" value={edu.university} onChange={e => updateEducation(edu.id, 'university', e.target.value)} />
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <Input placeholder="Year (e.g. 2022 – 2026)" value={edu.gradYear} onChange={e => updateEducation(edu.id, 'gradYear', e.target.value)} />
                                                <Input placeholder="GPA / % (optional)" value={edu.cgpa} onChange={e => updateEducation(edu.id, 'cgpa', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 4 · Skills */}
                        <section>
                            <SectionTitle n="4" label="Skills" onAdd={addSkillCategory} addLabel="Add Category" />
                            <div className="space-y-2.5">
                                {skillCategories.map((sc) => (
                                    <div key={sc.id} className="flex items-center gap-2">
                                        <div className="flex-1 grid grid-cols-3 gap-2">
                                            <Input placeholder="Category" value={sc.category} onChange={e => updateSkillCategory(sc.id, 'category', e.target.value)} />
                                            <input
                                                className="col-span-2 rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white text-sm"
                                                placeholder="Python, SQL, React..."
                                                value={sc.items}
                                                onChange={e => updateSkillCategory(sc.id, 'items', e.target.value)}
                                            />
                                        </div>
                                        {skillCategories.length > 1 && (
                                            <button onClick={() => removeSkillCategory(sc.id)} className="text-gray-400 hover:text-red-500 shrink-0"><Trash2 className="w-4 h-4" /></button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 5 · Experience */}
                        <section>
                            <SectionTitle n="5" label="Experience" onAdd={addExperience} addLabel="Add" />
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                        {experience.length > 1 && (
                                            <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        )}
                                        <div className="grid gap-2.5">
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <Input placeholder="Company / Organization" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                                                <Input placeholder="Role / Title" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <Input placeholder="Duration (e.g. Jul 2024)" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} />
                                                <Input placeholder="Location (optional)" value={exp.location} onChange={e => updateExperience(exp.id, 'location', e.target.value)} />
                                            </div>
                                            <textarea
                                                rows="3"
                                                className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white resize-none text-sm"
                                                placeholder="Responsibilities — one bullet per line"
                                                value={exp.description}
                                                onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 6 · Projects */}
                        <section>
                            <SectionTitle n="6" label="Projects" onAdd={addProject} addLabel="Add" />
                            <div className="space-y-4">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="relative bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                        {projects.length > 1 && (
                                            <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        )}
                                        <div className="grid gap-2.5">
                                            <Input placeholder="Project Name" value={proj.title} onChange={e => updateProject(proj.id, 'title', e.target.value)} />
                                            <Input placeholder="Technologies Used" value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)} />
                                            <textarea
                                                rows="2"
                                                className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white resize-none text-sm"
                                                placeholder="Description — one bullet per line"
                                                value={proj.description}
                                                onChange={e => updateProject(proj.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 7 · Certifications */}
                        <section>
                            <SectionTitle n="7" label="Certifications" optional />
                            <textarea
                                rows="4"
                                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none text-sm"
                                placeholder="One certification per line&#10;e.g. IBM: Python 101 for Data Science&#10;AWS Academy Graduate — Cloud Web Application Builder"
                                value={certifications}
                                onChange={e => setCertifications(e.target.value)}
                            />
                        </section>

                        <hr className="border-gray-100" />

                        {/* 8 · Awards & Achievements */}
                        <section>
                            <SectionTitle n="8" label="Awards & Achievements" optional />
                            <textarea
                                rows="3"
                                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white resize-none text-sm"
                                placeholder="One achievement per line&#10;e.g. National Finalist — IBM Pan India Hackathon"
                                value={achievements}
                                onChange={e => setAchievements(e.target.value)}
                            />
                        </section>
                    </div>

                    {/* ── Right: Live Preview ── */}
                    <div className="lg:col-span-7 xl:col-span-7 sticky top-28 hidden lg:block" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200/60 p-5 rounded-2xl border border-gray-200/60">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Live Preview</p>
                            <div className="flex justify-center">
                                <div id="preview-zoom-wrapper" style={{ zoom: PREVIEW_ZOOM }}>
                                    <div
                                        id="resume-paper"
                                        style={{
                                            width: '794px',
                                            minHeight: '1123px',
                                            background: '#ffffff',
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                                        }}
                                    >
                                        <ResumePreview {...previewProps} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden p-4 text-center text-gray-500 text-sm">
                Live preview is available on desktop view. Export to see the final document.
            </div>
        </div>

        {/* Hidden full-size export target — absolute so content isn't viewport-clipped by html2canvas */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none', width: '794px', overflow: 'visible' }}>
            <div id="export-resume-paper" style={{ width: '794px', background: '#ffffff' }}>
                <ResumePreview {...previewProps} />
            </div>
        </div>
        </>
    );
};

const Label = ({ children }) => <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>;

const SectionTitle = ({ n, label, optional, onAdd, addLabel }) => (
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">{n}</span>
            {label}
            {optional && <span className="text-xs text-gray-400 font-normal">(optional)</span>}
        </h2>
        {onAdd && (
            <button type="button" onClick={onAdd} className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                <Plus className="w-4 h-4" /> {addLabel}
            </button>
        )}
    </div>
);

export default ResumeBuilder;
