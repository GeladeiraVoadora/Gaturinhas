import React from 'react';
import CemeteryComponente from '../Components/Cemetery';
import Navbar from '../Components/Navbar';

export const Cemetery: React.FC = () => {
  return (
    <div>
      <Navbar />
      <CemeteryComponente />
    </div>
  );
};

export default Cemetery;
