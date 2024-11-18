import React, { useState } from 'react';
import '../../index.css';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export const CreateAlbumButton: React.FC = () => {
  const userId = localStorage.getItem('userId');
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

  const criarAlbum = () => {
    if (!userId) {
      openModal("Você precisa estar logado para criar um álbum.");
      return;
    }

    Axios.post('http://localhost:3030/api/album/create', {
      userId: userId,
    })
      .then((response) => {
        console.log(response);
        if (response.data === true) {
          openModal('Álbum criado com sucesso!');
          setTimeout(() => {
            navigate('/album');
            window.location.reload();
          }, 2000);
        } else {
          openModal('Você já tem um álbum.');
        }
      })
      .catch((error) => {
        console.log(error);
        openModal('Ocorreu um erro ao tentar criar o álbum.');
      });
  };

  return (
    <div>
      <button className="button2" onClick={criarAlbum}>Criar Álbum</button>

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

export default CreateAlbumButton;
