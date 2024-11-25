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
    const invId = localStorage.getItem("invId");
    if (!invId || !userId) {
      return;
    }

    Axios.get(`http://localhost:3030/api/dailyP/${userId}/lastClickedDate`)
      .then((response) => {
        const lastClickedDate: string = response.data.clickb;
        console.log(lastClickedDate);
        const today = new Date().toISOString().slice(0, 10);

        if (!lastClickedDate || lastClickedDate !== today) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.error(error);
        openModal("Erro ao verificar o estado do pacote diário.");
      });
  }, []);

  const CollectPackage = () => {
    const userId = localStorage.getItem("userId");
    const invId = localStorage.getItem("invId");
    if (!invId || !userId) {
      openModal("Usuário ou inventário não encontrados.");
      return;
    }

    Axios.put(`http://localhost:3030/api/dailyP/${invId}`)
      .then((response) => {
        console.log(response);
        openModal("Cartas obtidas com sucesso!");

        setDisabled(true);
        const today = new Date().toISOString().slice(0, 10);

        Axios.put(`http://localhost:3030/api/dailyP/${userId}/UpdatelastClickedDate`, { clickb: today });
      })
      .catch((error) => {
        console.error(error);
        openModal("Erro ao coletar o pacote diário.");
      });
  };

  return (
    <div className="dailyPButton">
      <button disabled={disabled} onClick={CollectPackage}>
        Collect your daily package
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
