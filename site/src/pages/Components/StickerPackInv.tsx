import React, { useState } from "react";
import axios from "axios";
import '../../index.css';

interface StickerPackStoreProps {
  pacprodId: number;
  image: string;
  name: string;
}

const StickerPackStore: React.FC<StickerPackStoreProps> = ({ pacprodId, image, name }) => {
  const invId = parseInt(localStorage.getItem('invId') || "0", 10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAllOpen = () => {
    axios.post(`http://localhost:3030/api/openAllPacks`, {
      invId: invId
    })
    .then(response => {
      console.log(invId);
      openModal("Você acabou de abrir os pacotes, cuidado com a enxurrada de figurinhas!");
      console.log(response.data);
      setTimeout(() => window.location.reload(), 2000);
    })
    .catch(error => {
      console.log(error);
      openModal("Ocorreu um erro ao abrir os pacotes");
    });
  };

  const handleOpen = () => {
    axios.post(`http://localhost:3030/api/openpack/`, {
      pacprodId: pacprodId,
      invId: invId
    })
    .then(response => {
      console.log(pacprodId);
      console.log(invId);
      openModal("Você acabou de abrir o pacote, dê uma olhada nas suas novas figurinhas!");
      console.log(response.data);
      setTimeout(() => window.location.reload(), 2000);
    })
    .catch(error => {
      console.log(error);
      openModal("Ocorreu um erro ao abrir o pacote");
    });
  };

  return (
    <div className="stickerPack">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <button onClick={handleOpen}>Abrir</button>
      <button onClick={handleAllOpen}>Abrir todos</button>

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
