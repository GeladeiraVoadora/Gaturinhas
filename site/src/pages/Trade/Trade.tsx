import React from 'react';
import Navbar from '../Components/Navbar';
import TradeCardGrid from '../Components/TradeCardGrid';
import './Style.css';

export const Trade: React.FC = () => {
  return (
    <div>
      <Navbar />
      <TradeCardGrid />
    </div>
  );
};

export default Trade;
