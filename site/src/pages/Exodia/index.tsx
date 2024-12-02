import React from "react";
import Navbar from "../Components/Navbar";

const Forge: React.FC = () => {
  return (
    <div className="forge-container">
      <Navbar />
      <h2>Forjar Cartas</h2>
      <div className="cards-container">
        {/* Espaços para as cartas */}
        <div className="card-slot solo"></div>
        <div className="card-slot duo-left"></div>
        <div className="card-slot duo-right"></div>
        <div className="card-slot trio-left"></div>
        <div className="card-slot trio-right"></div>
      </div>
      <button className="forge-button">Forjar</button>
    </div>
  );
};

export default Forge;
