import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../index.css";

export const Button: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
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
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    const lastClickedDate = localStorage.getItem("lastClickedDate");
    const today = new Date().toISOString().slice(0, 10);

    if (!lastClickedDate || lastClickedDate !== today) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  const handleCollectReward = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openModal("Você precisa estar logado para coletar moedas diárias.");
      return;
    }

    Axios.put(`http://localhost:3030/api/coins/daily/${userId}`, { money: 10 })
      .then(() => {
        openModal("Moedas coletadas com sucesso!");
        setDisabled(true);
        const today = new Date().toISOString().slice(0, 10);

        localStorage.setItem("lastClickedDate", today);

        Axios.put(
          `http://localhost:3030/api/coins/daily/${userId}/UpdatelastClickedDate`,
          { click: today }
        );
      })
      .catch((error) => {
        console.error(error);
        openModal("Ocorreu um erro ao coletar as moedas.");
      });
  };

  return (
    <div className="dailyButton">
      <button disabled={disabled} onClick={handleCollectReward}>
        Collect your daily coins
      </button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="modal-close">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
