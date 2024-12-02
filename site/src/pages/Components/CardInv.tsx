import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css';

interface CardProps {
  prodId: number;
  image: string;
  name: string;
}

const Card: React.FC<CardProps> = ({ prodId, image, name }) => {
  const userId = parseInt(localStorage.getItem('userId') || "0", 10);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const colar = () => {
    if (!userId) {
      openModal('Você deve estar logado para colar');
      navigate('/');
      return;
    }

    axios.put(`http://localhost:3030/api/album/stick/${userId}`, {
      prodId: prodId,
    })
    .then(response => {
      if (response.data === false) { 
        openModal("Não foi possível colar a figurinha");
      } else {
        openModal("Colado!");
        setTimeout(() => window.location.reload(), 2000);
      }
    })
    .catch(error => {
      console.log(error);
      openModal("Ocorreu um erro ao realizar a colagem");
    });
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <button onClick={colar}>Stick</button>

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
