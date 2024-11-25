import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../index.css';

interface StickerPackStoreProps {
  pacId: number;
  image: string;
  name: string;
  price: string;
}

const StickerPackStore: React.FC<StickerPackStoreProps> = ({ pacId, image, name, price }) => {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

    axios.post("http://localhost:3030/api/compra/Pac", {
      pacId: pacId,
      email: email
    })
      .then(response => {
        if (response.data === false) {
          openModal("Você não tem dinheiro suficiente para comprar o pacote de figurinhas");
        } else {
          openModal("Compra realizada");
          setTimeout(() => window.location.reload(), 2000);
        }
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        openModal("Ocorreu um erro ao realizar a compra");
      });
  };

  return (
    <div className="stickerPack">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={handleBuy}>Buy</button>

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

export default StickerPackStore;
