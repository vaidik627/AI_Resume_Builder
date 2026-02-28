import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, FileText, PenTool, TrendingUp, ArrowRight } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-gray-50/50 min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 lg:pt-32 lg:pb-28">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    {/* Hero Left: Text Content */}
                    <div className="lg:col-span-6 text-left mb-16 lg:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/50 text-green-700 font-medium text-sm mb-6 border border-green-200">
                            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                            AI-Powered Career Tools
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                            AI-Powered <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Resume & Cover Letter</span><br />
                            Builder
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
                            Create professional, ATS-optimized resumes and job-specific cover letters in minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate('/resume-builder')}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 px-8 rounded-xl transition-all shadow-md shadow-green-600/20 flex items-center justify-center gap-2 active:scale-95 text-lg"
                            >
                                Start Building
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium py-3.5 px-8 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 text-lg"
                            >
                                Explore Features
                            </button>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 font-medium whitespace-nowrap overflow-x-auto pb-2">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card required</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free export</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> ATS friendly</span>
                        </div>
                    </div>

                    {/* Hero Right: Mockup/Visual */}
                    <div className="lg:col-span-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-blue-50 transform rounded-3xl -rotate-3 scale-105 opacity-50"></div>
                        <div className="relative bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 p-2 overflow-hidden aspect-[4/3] flex flex-col">
                            {/* Browser-like header */}
                            <div className="w-full h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5 rounded-t-xl shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            </div>
                            {/* Dashboard content abstract */}
                            <div className="flex-1 p-6 grid grid-cols-3 gap-6 bg-gray-50/50">
                                <div className="col-span-1 space-y-4">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                </div>
                                <div className="col-span-2 space-y-6">
                                    <div className="space-y-3">
                                        <div className="h-5 bg-green-100 rounded w-1/3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-5 bg-green-100 rounded w-2/5"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-5 bg-green-100 rounded w-1/4"></div>
                                        <div className="flex gap-2">
                                            <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                                            <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                                            <div className="h-8 bg-gray-200 rounded-lg w-14"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100 bg-white">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to land your dream job</h2>
                    <p className="text-lg text-gray-500">Powerful tools designed to help you stand out and get hired faster.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Horizontal Feature 1 */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-4 items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="bg-green-100 p-3 rounded-xl shrink-0">
                            <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Resume Builder</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Intuitive interface that formats your experience perfectly. Real-time preview ensures your resume always looks professional.
                            </p>
                        </div>
                    </div>

                    {/* Horizontal Feature 2 */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-4 items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="bg-green-100 p-3 rounded-xl shrink-0">
                            <PenTool className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Cover Letters</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Generate tailored cover letters matching specific job descriptions instantly. Choose your tone and highlight relevant skills.
                            </p>
                        </div>
                    </div>

                    {/* Horizontal Feature 3 */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-4 items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="bg-green-100 p-3 rounded-xl shrink-0">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">ATS Optimization</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Our templates are designed to pass through Applicant Tracking Systems, ensuring your application reaches human eyes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple logo section */}
            <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100 text-center">
                <p className="text-sm font-medium text-gray-400 tracking-wider uppercase mb-8">Trusted by candidates hired at</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                    <span className="text-xl font-bold text-gray-600">Google</span>
                    <span className="text-xl font-bold text-gray-600">Microsoft</span>
                    <span className="text-xl font-bold text-gray-600">Amazon</span>
                    <span className="text-xl font-bold text-gray-600">Meta</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
