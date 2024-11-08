import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarButton from './assets/NavbarButton';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <button
          className="text-m font-bold mb-2 md:mb-0 justify-center items-center"
          onClick={() => navigate(-1)}
        >
          &larr;
        </button>
        <div className="flex space-x-2">
          <NavbarButton label="Programas" path="/programs" />
          <NavbarButton label="En vivo" path="/live" />
          <NavbarButton label="Promocioná" path="/promotion" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;