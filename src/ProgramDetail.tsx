import React from 'react';
import { useParams } from 'react-router-dom';

const ProgramDetail: React.FC = () => {
  const { date, hipodromo } = useParams<{ date: string; hipodromo: string }>();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Detalles del Programa</h2>
      <p className="text-lg">Fecha: {date}</p>
      <p className="text-lg">Hipódromo: {hipodromo}</p>
      {/* Aquí puedes agregar más detalles específicos del programa */}
    </div>
  );
};

export default ProgramDetail;