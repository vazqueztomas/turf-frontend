import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { programs } from './programData';

const Programs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Programas disponibles:</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {programs.map((program, index) => {
            const [, month, day] = program.date.split('-');
            return (
              <button
                key={index}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() =>
                  navigate(`/program/${program.date}/${program.hipodromo}`, {
                    state: { races: program.races },
                  })
                }
              >
                {day}/{month} - {program.hipodromo}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Programs;