import React, { useState, useEffect } from "react";
import Axios from "axios";
import audioFile from "../../Assets/GatinhoAlimentado.mp3";
import "../../index.css";

export const Button: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [audio] = useState<HTMLAudioElement>(new Audio(audioFile));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId") || "0", 10);
    if (!userId) {
      return;
    }

    Axios.get(`http://localhost:3030/api/album/${userId}/lastClickedDate`)
      .then((response) => {
        const lastClickedDate: string = response.data.catFed;
        const today = new Date().toISOString().slice(0, 10);

        if (!lastClickedDate || lastClickedDate !== today) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.error(error);
        openModal("Erro ao verificar o estado de alimentação dos gatinhos.");
      });
  }, []);

  const feedCats = () => {
    const userId = parseInt(localStorage.getItem("userId") || "0", 10);
    if (!userId) {
      openModal("Usuário não autenticado.");
      return;
    }

    Axios.put(`http://localhost:3030/api/album/feed/${userId}`)
      .then((response) => {
        if (response.data === true) {
          audio.play();
          openModal("Gatinhos Alimentados!");
          setDisabled(true);

          const today = new Date().toISOString().slice(0, 10);
          Axios.put(`http://localhost:3030/api/album/${userId}/UpdatelastClickedDate`, { catFed: today });
        } else {
          openModal("Gaturinhas Insuficientes para alimentar!");
        }
      })
      .catch((error) => {
        console.error(error);
        openModal("Erro ao alimentar os gatinhos.");
      });
  };

  return (
    <div className="dailyButton">
      <button disabled={disabled} onClick={feedCats}>
        Alimentar Gatinhos
      </button>

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

export default Button;
