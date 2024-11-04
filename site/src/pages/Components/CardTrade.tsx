import React from "react";
import '../../index.css';
import axios from 'axios';

interface CardProps {
  gatId: number;
  amount: number;
  image: string;
  name: string;
  prodIds: number[];
}

const Card: React.FC<CardProps> = ({ amount, image, name, prodIds }) => {
  const invId = parseInt(localStorage.getItem('invId') || "0", 10);

  const handleTrade = () => {
    axios.post(`http://localhost:3030/api/tradeCards`, {
      prodIds: prodIds,
      invId: invId
    })
    .then(response => {
      alert("Você trocou as suas figurinhas repetidas! Vá até seu inventário ver que figurinha você ganhou");
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      alert("Ocorreu um erro ao trocar as figurinhas");
    });
  };

  const handleTradeEqual = () => {
    axios.post(`http://localhost:3030/api/tradeCards/equal`, {
      prodIds: prodIds,
      invId: invId
    })
    .then(response => {
      alert("Suas figurinhas se fundiram e evoluíram! Vá até seu inventário ver que figurinha você ganhou");
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      alert("Ocorreu um erro ao trocar as figurinhas");
    });
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Duplicate cards : {amount}</p>
      <button onClick={handleTrade}>Trade 5 cards</button>
      <button onClick={handleTradeEqual}>Upgrade Rarity</button>
    </div>
  );
};

export default Card;
