import React from 'react';
import './Style.css';
import Navbar from '../Components/Navbar';
import CardGridInv from '../Components/CardGridInv';

export const Inventory: React.FC = () => {
  return (
    <div>
      <Navbar />
      <CardGridInv />
      <div></div>
    </div>
  );
};

export default Inventory;
