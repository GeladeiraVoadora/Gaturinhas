import React from 'react';
import '../../index.css';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export const CreateAlbumButton: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const criarAlbum = () => {
    if (!userId) {
      alert("Você precisa estar logado para criar um álbum.");
      return;
    }

    Axios.post('http://localhost:3030/api/album/create', {
      userId: userId,
    })
    .then((response) => {
      console.log(response);
      if (response.data === true) {
        alert('Álbum criado com sucesso!');
        navigate('/album');
        window.location.reload();
      } else {
        alert('Você já tem um álbum.');
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao tentar criar o álbum.');
    });
  };

  return (
    <div>
      <button className="button2" onClick={criarAlbum}>Criar Álbum</button>
    </div>
  );
};

export default CreateAlbumButton;
