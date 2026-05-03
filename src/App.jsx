import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import InterviewPrep from './pages/InterviewPrep';
import ColdEmailGenerator from './pages/ColdEmailGenerator';
import JobPackage from './pages/JobPackage';
import ATSScore from './pages/ATSScore';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#f8f9fb] text-gray-900">
          <Header />
          <main className="flex-grow flex w-full p-4 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/cold-email" element={<ColdEmailGenerator />} />
              <Route path="/job-package" element={<JobPackage />} />
              <Route path="/ats-score" element={<ATSScore />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
