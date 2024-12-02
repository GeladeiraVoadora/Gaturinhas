import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css';

interface CardProps {
  gatId: number;
  image: string;
  name: string;
  price: string;
}

const Card: React.FC<CardProps> = ({ gatId, image, name, price }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBuy = () => {
    if (!email) {
      openModal('Você deve estar logado para realizar a compra');
      navigate('/');
      return;
    }

    axios.post("http://localhost:3030/api/compra", {
      gatId,
      email,
    })
      .then(response => {
        if (response.data === false) {
          openModal("Você não tem dinheiro suficiente para comprar essa figurinha");
        } else {
          openModal("Compra realizada");
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch(error => {
        console.error(error);
        openModal("Ocorreu um erro ao realizar a compra");
      });
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={handleBuy}>Comprar</button>

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
