import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext({ resumeData: null, setResumeData: () => {} });

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
