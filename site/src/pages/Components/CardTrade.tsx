import React, { useState } from "react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTrade = () => {
    axios.post(`http://localhost:3030/api/tradeCards`, {
      prodIds: prodIds,
      invId: invId
    })
    .then(response => {
      openModal("Você trocou as suas figurinhas repetidas! Vá até seu inventário ver que figurinha você ganhou");
      console.log(response.data);
      setTimeout(() => window.location.reload(), 2000);
    })
    .catch(error => {
      console.log(error);
      openModal("Ocorreu um erro ao trocar as figurinhas");
    });
  };

  const handleTradeEqual = () => {
    axios.post(`http://localhost:3030/api/tradeCards/equal`, {
      prodIds: prodIds,
      invId: invId
    })
    .then(response => {
      openModal("Suas figurinhas se fundiram e evoluíram! Vá até seu inventário ver que figurinha você ganhou");
      console.log(response.data);
      setTimeout(() => window.location.reload(), 2000);
    })
    .catch(error => {
      console.log(error);
      openModal("Ocorreu um erro ao trocar as figurinhas");
    });
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Duplicate cards: {amount}</p>
      <button onClick={handleTrade}>Trade 5 cards</button>
      <button onClick={handleTradeEqual}>Upgrade Rarity</button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="modal-close">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
