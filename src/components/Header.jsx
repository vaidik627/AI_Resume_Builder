import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wand2, X, Menu, Zap } from 'lucide-react';

const NAV_LINKS = [
    { to: '/resume-builder', label: 'Resume Builder' },
    { to: '/cover-letter-generator', label: 'Cover Letter' },
    { to: '/interview-prep', label: 'Interview Prep' },
    { to: '/cold-email', label: 'Cold Email' },
    { to: '/ats-score', label: 'ATS Score' },
];

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) =>
        location.pathname === path
            ? 'text-green-600 font-semibold bg-green-50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium';

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-[1.05rem] font-bold text-gray-900 hover:text-green-700 transition-colors shrink-0">
                    <div className="bg-green-600 p-1.5 rounded-lg shadow-sm shadow-green-600/30">
                        <Wand2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="tracking-tight">ResumeAI</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
                    {NAV_LINKS.map(link => (
                        <Link key={link.to} to={link.to} className={`px-3.5 py-1.5 rounded-lg text-sm ${isActive(link.to)}`}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center shrink-0">
                    <Link
                        to="/job-package"
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                            location.pathname === '/job-package'
                                ? 'bg-green-700 text-white shadow-lg shadow-green-700/25'
                                : 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/25'
                        }`}
                    >
                        <Zap className="w-4 h-4" />
                        1-Click Apply
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-4 space-y-1 shadow-lg">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeMenu}
                            className={`block py-2.5 px-3 rounded-xl font-medium text-sm transition-colors ${
                                location.pathname === link.to
                                    ? 'bg-green-50 text-green-700 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/job-package"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
                    >
                        <Zap className="w-4 h-4" /> 1-Click Apply
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
