import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './assets/Header';
import Button from './assets/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 bg-gray-100">
      <Header />
      <Button label="Programas" onClick={() => navigate('/programs')} />
    </div>
  );
};

export default Home;