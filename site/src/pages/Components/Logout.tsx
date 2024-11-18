import React, { useState } from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

const invId = localStorage.getItem('invId');
const userId = localStorage.getItem('userId');

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const sair = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('invId');
    setModalOpen(true);
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button className="button2" onClick={sair}>Logout</button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Deslogado com sucesso!</p>
            <button onClick={closeModal} className="modal-close">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
