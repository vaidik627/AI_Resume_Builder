import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import CoverLetterGenerator from './pages/CoverLetterGenerator';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-grow flex w-full p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
