import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="bg-green-600 p-1 rounded-md">
                            <Wand2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        ResumeAI
                    </Link>
                    <div className="flex items-center gap-5 text-xs font-medium text-gray-400">
                        <Link to="/resume-builder" className="hover:text-gray-700 transition-colors">Resume Builder</Link>
                        <Link to="/cover-letter-generator" className="hover:text-gray-700 transition-colors">Cover Letter</Link>
                        <Link to="/interview-prep" className="hover:text-gray-700 transition-colors">Interview Prep</Link>
                        <Link to="/job-package" className="hover:text-gray-700 transition-colors">1-Click Apply</Link>
                    </div>
                    <p className="text-xs text-gray-400">© 2026 ResumeAI · Built with AI &amp; NLP</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
