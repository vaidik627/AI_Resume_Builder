import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path 
            ? 'text-green-600 font-semibold' 
            : 'text-gray-600 hover:text-green-600 transition-colors font-medium';
    };

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                {/* Logo & Brand */}
                <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                    <div className="bg-green-600 p-2 rounded-xl">
                        <Wand2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="tracking-tight">ResumeAI</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/resume-builder" className={isActive('/resume-builder')}>
                        Resume Builder
                    </Link>
                    <Link to="/cover-letter-generator" className={isActive('/cover-letter-generator')}>
                        Cover Letter Generator
                    </Link>
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                        Login
                    </button>
                    <Link 
                        to="/resume-builder" 
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-green-600/20 active:scale-95"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button (Simple version) */}
                <div className="md:hidden">
                    <button className="p-2 text-gray-600 hover:text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
