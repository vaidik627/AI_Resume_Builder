import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wand2, X, Menu } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) =>
        location.pathname === path
            ? 'text-green-600 font-semibold'
            : 'text-gray-600 hover:text-green-600 transition-colors font-medium';

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-3 text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                    <div className="bg-green-600 p-2 rounded-xl">
                        <Wand2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="tracking-tight">ResumeAI</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/resume-builder" className={isActive('/resume-builder')}>Resume Builder</Link>
                    <Link to="/cover-letter-generator" className={isActive('/cover-letter-generator')}>Cover Letter Generator</Link>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/resume-builder"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-green-600/20 active:scale-95"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-md">
                    <Link
                        to="/resume-builder"
                        onClick={closeMenu}
                        className="block py-2.5 px-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                    >
                        Resume Builder
                    </Link>
                    <Link
                        to="/cover-letter-generator"
                        onClick={closeMenu}
                        className="block py-2.5 px-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                    >
                        Cover Letter Generator
                    </Link>
                    <Link
                        to="/resume-builder"
                        onClick={closeMenu}
                        className="block mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium text-center transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
