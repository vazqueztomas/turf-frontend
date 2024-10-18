import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './assets/Header';
import Button from './assets/Button';
import Programs from './Programs';
import ProgramDetail from './ProgramDetail';

export default function App() {
  const [showPrograms, setShowPrograms] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center pt-10 bg-gray-100">
        <Header />
        {showPrograms ? (
          <Programs />
        ) : (
          <Button label="Programas" onClick={() => setShowPrograms(true)} />
        )}
        <Routes>
          <Route path="/program/:date/:hipodromo" element={<ProgramDetail />} />
        </Routes>
      </div>
    </Router>
  );
}