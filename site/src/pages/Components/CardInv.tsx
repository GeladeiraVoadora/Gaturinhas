import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css';
import audioFile from "../../Assets/GatoVendido.mp3";

interface CardProps {
  prodId: number;
  image: string;
  name: string;
}

const email = localStorage.getItem("email");


const Card: React.FC<CardProps> = ({ prodId, image, name }) => {
  const userId = parseInt(localStorage.getItem('userId') || "0", 10);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [audio] = useState(new Audio(audioFile));

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

  const vender = () => {
    if (!userId) {
      openModal('Você deve estar logado para vender');
      navigate('/');
      return;
    }

    axios.post(`http://localhost:3030/api/sell`, {
      prodId: prodId,
      email: email
    })
    .then(response => {
      if (response.data === false) { 
        openModal("Não foi possível vender a figurinha");
      } else {
        openModal("Vendido!");
        audio.play(); // Toca o áudio

      // Aguarda o término do áudio antes de recarregar a página
        audio.onended = () => {
          setTimeout(() => window.location.reload(), 500);};
      }
    })
    .catch(error => {
      console.log(error);
      openModal("Ocorreu um erro ao realizar a venda");
    });
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <button onClick={colar}>Stick</button>
      <button onClick={vender}>sell</button>

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
