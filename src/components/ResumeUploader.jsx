import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfParser';
import { extractResumeData } from '../utils/ai';

const ResumeUploader = ({ onExtracted, onDismiss }) => {
  const [status, setStatus] = useState('idle'); // idle | reading | parsing | done | error
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const processFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setErrorMsg('Please upload a PDF file.');
      setStatus('error');
      return;
    }

    setFileName(file.name);
    setErrorMsg('');

    try {
      setStatus('reading');
      const text = await extractTextFromPDF(file);

      if (!text || text.length < 50) {
        throw new Error('Could not extract text from this PDF. Try a different file.');
      }

      setStatus('parsing');
      const data = await extractResumeData(text);
      setStatus('done');
      onExtracted(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to process resume.');
      setStatus('error');
    }
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  if (status === 'done') {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-800">Resume loaded: <span className="font-normal">{fileName}</span></p>
            <p className="text-xs text-green-600 mt-0.5">All fields have been auto-filled from your resume.</p>
          </div>
        </div>
        <button onClick={onDismiss} className="text-green-500 hover:text-green-700 ml-4">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => status === 'idle' || status === 'error' ? inputRef.current?.click() : null}
      className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer
        ${isDragging ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'}
        ${status === 'error' ? 'border-red-300 bg-red-50' : ''}
      `}
    >
      <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />

      {(status === 'reading' || status === 'parsing') ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <p className="text-sm font-medium text-gray-700">
            {status === 'reading' ? 'Reading your PDF...' : 'AI is parsing your resume...'}
          </p>
          <p className="text-xs text-gray-400">{fileName}</p>
        </div>
      ) : status === 'error' ? (
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p className="text-sm font-medium text-red-600">{errorMsg}</p>
          <p className="text-xs text-gray-400">Click to try again</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center">
            <Upload className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Upload your existing resume</p>
            <p className="text-xs text-gray-500 mt-1">Drag & drop or click · PDF only · AI auto-fills all fields</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
