import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, FileText, PenTool, TrendingUp, ArrowRight, MessageSquare, Mail, Zap, Sparkles } from 'lucide-react';

const FEATURES = [
    {
        icon: <FileText className="w-5 h-5 text-green-600" />,
        iconBg: 'bg-green-100',
        title: 'Smart Resume Builder',
        desc: 'Live preview, ATS-tailored bullet points, and one-click PDF export.',
        route: '/resume-builder',
    },
    {
        icon: <PenTool className="w-5 h-5 text-green-600" />,
        iconBg: 'bg-green-100',
        title: 'AI Cover Letters',
        desc: 'Generate tailored cover letters in seconds. Choose tone, export instantly.',
        route: '/cover-letter-generator',
    },
    {
        icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
        iconBg: 'bg-purple-100',
        title: 'Interview Prep',
        desc: 'Get 5 tailored interview questions with model answers based on the job.',
        route: '/interview-prep',
    },
    {
        icon: <Mail className="w-5 h-5 text-amber-600" />,
        iconBg: 'bg-amber-100',
        title: 'Cold Email Generator',
        desc: 'Write high-converting cold emails to recruiters in under 30 seconds.',
        route: '/cold-email',
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-green-700" />,
        iconBg: 'bg-green-100',
        title: 'ATS Score & Feedback',
        desc: 'Get a match score and AI feedback against any job description.',
        route: '/job-package',
    },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#f8f9fb] min-h-screen">

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 lg:pt-32 lg:pb-28">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    {/* Left */}
                    <div className="lg:col-span-6 text-left mb-16 lg:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold text-xs mb-6 border border-green-200 uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            AI-Powered Career Tools
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 tracking-tight leading-[1.08] mb-6">
                            Land your dream job<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">faster with AI.</span>
                        </h1>
                        <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                            Create ATS-optimized resumes, cover letters, and cold emails — all tailored to the job in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => navigate('/job-package')}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-green-600/25 flex items-center justify-center gap-2 active:scale-95 text-base"
                            >
                                <Zap className="w-5 h-5" />
                                1-Click Apply
                            </button>
                            <button
                                onClick={() => navigate('/resume-builder')}
                                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold py-3.5 px-7 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 text-base"
                            >
                                Build Resume
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free to use</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> No sign-up needed</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> ATS friendly</span>
                        </div>
                    </div>

                    {/* Right: Visual Mockup */}
                    <div className="lg:col-span-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-100/60 to-blue-50/60 rounded-3xl -rotate-2 scale-105"></div>
                        <div className="relative bg-white border border-gray-200/80 rounded-2xl shadow-2xl shadow-gray-200/60 overflow-hidden">
                            {/* Browser bar */}
                            <div className="w-full h-9 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                                <div className="ml-4 flex-1 bg-gray-200/60 rounded-md h-4 max-w-[160px]"></div>
                            </div>
                            {/* Mock resume content */}
                            <div className="p-6 grid grid-cols-5 gap-5 bg-gray-50/40 aspect-[4/3]">
                                <div className="col-span-2 space-y-3">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded-full w-4/5"></div>
                                    <div className="h-3 bg-gray-200 rounded-full w-3/5"></div>
                                    <div className="mt-4 space-y-2">
                                        <div className="h-2.5 bg-green-100 rounded-full w-full"></div>
                                        <div className="h-2.5 bg-green-100 rounded-full w-5/6"></div>
                                        <div className="h-2.5 bg-green-100 rounded-full w-4/6"></div>
                                    </div>
                                </div>
                                <div className="col-span-3 space-y-5">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-800 rounded w-2/5"></div>
                                        <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                                        <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                                        <div className="h-2.5 bg-gray-200 rounded-full w-3/4"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                                        <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                                        <div className="h-2.5 bg-gray-200 rounded-full w-5/6"></div>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <div className="h-7 bg-green-100 border border-green-200 rounded-lg w-16"></div>
                                        <div className="h-7 bg-green-100 border border-green-200 rounded-lg w-20"></div>
                                        <div className="h-7 bg-green-100 border border-green-200 rounded-lg w-14"></div>
                                        <div className="h-7 bg-green-100 border border-green-200 rounded-lg w-18"></div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <div className="h-8 bg-green-600 rounded-lg flex-1 flex items-center justify-center">
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </div>
                                        <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div id="features" className="bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-3">All-in-one toolkit</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Everything you need to get hired</h2>
                        <p className="text-gray-500 text-lg">5 powerful AI tools — from resume to offer.</p>
                    </div>

                    {/* Hero feature card */}
                    <div
                        onClick={() => navigate('/job-package')}
                        className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl shadow-green-600/20 hover:shadow-2xl hover:shadow-green-600/25 hover:scale-[1.01] transition-all mb-5"
                    >
                        <div className="bg-white/20 p-3 rounded-xl shrink-0">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2.5 mb-1.5">
                                <h3 className="text-xl font-bold text-white">1-Click Job Application Package</h3>
                                <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full tracking-wide">FLAGSHIP</span>
                            </div>
                            <p className="text-green-50 leading-relaxed text-sm">Paste one job description → get resume bullets, cover letter, cold email, interview questions & ATS score — all at once.</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white shrink-0" />
                    </div>

                    {/* Feature grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {FEATURES.map((f, i) => (
                            <div
                                key={i}
                                onClick={() => navigate(f.route)}
                                className="cursor-pointer group flex flex-col gap-4 items-start p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/80 hover:shadow-sm transition-all"
                            >
                                <div className={`${f.iconBg} p-2.5 rounded-xl`}>{f.icon}</div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{f.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Social proof strip */}
            <div className="max-w-7xl mx-auto px-4 py-14 text-center">
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-7">Used by candidates hired at</p>
                <div className="flex flex-wrap justify-center gap-10 sm:gap-16 opacity-40 grayscale">
                    {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map(c => (
                        <span key={c} className="text-lg font-bold text-gray-700">{c}</span>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Ready to stand out?</h2>
                    <p className="text-gray-500 mb-8 text-lg">Generate your full job application package in under 2 minutes.</p>
                    <button
                        onClick={() => navigate('/job-package')}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-9 rounded-xl transition-all shadow-lg shadow-green-600/25 inline-flex items-center gap-2 active:scale-95 text-base"
                    >
                        <Zap className="w-5 h-5" />
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
