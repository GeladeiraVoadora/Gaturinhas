import React, { useState } from "react";
import "../../index.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import audioFile from "../../Assets/GatoVendido.mp3";

export const SellAlbumButton: React.FC = () => {
  const [audio] = useState<HTMLAudioElement>(new Audio(audioFile));
  const userId = localStorage.getItem("userId");
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

  const venderAlbum = () => {
    if (!userId) {
      openModal("Usuário não autenticado.");
      return;
    }

    Axios.post("http://localhost:3030/api/album/sell", {
      userId: userId,
    })
      .then((response) => {
        console.log(response);
        if (response.data === true) {
          audio.play();
          openModal("Álbum vendido!");
          setTimeout(() => {
            navigate("/album");
            window.location.reload();
          }, 2000);
        } else if (response.data.msg === "Gaturinhas insuficientes para vender") {
          openModal("Gaturinhas insuficientes para vender o álbum!");
        } else {
          openModal("Álbum não encontrado ou vazio");
        }
      })
      .catch((error) => {
        console.error(error);
        openModal("Ocorreu um erro ao tentar vender o álbum.");
      });
  };

  return (
    <div>
      <button className="button2" onClick={venderAlbum}>
        Vender Álbum
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

export default SellAlbumButton;
