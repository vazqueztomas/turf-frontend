import React from 'react';
import { useNavigate } from 'react-router-dom';

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const programs = [
    { date: '2023-10-01', hipodromo: 'Palermo' },
    { date: '2023-11-01', hipodromo: 'Palermo' },
    { date: '2023-12-01', hipodromo: 'Palermo' },
    { date: '2023-10-02', hipodromo: 'San Isidro' },
    { date: '2023-12-02', hipodromo: 'San Isidro' },
    { date: '2023-15-02', hipodromo: 'San Isidro' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Programas disponibles:</h2>
      <div className="flex flex-wrap gap-4">
        {programs.map((program, index) => {
          const [year, month, day] = program.date.split('-');
          return (
            <button
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => navigate(`/program/${program.date}/${program.hipodromo}`)}
            >
              {day}/{month} - {program.hipodromo}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;