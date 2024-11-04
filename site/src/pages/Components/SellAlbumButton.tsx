import React, { useState } from "react";
import "../../index.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import audioFile from "../../Assets/GatoVendido.mp3";

export const SellAlbumButton: React.FC = () => {
  const [audio] = useState<HTMLAudioElement>(new Audio(audioFile));
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const venderAlbum = () => {
    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }

    Axios.post("http://localhost:3030/api/album/sell", {
      userId: userId,
    })
    .then((response) => {
      console.log(response);
      if (response.data === true) {
        audio.play();
        alert("Álbum vendido!");
        navigate("/album");
        window.location.reload();
      } else if (response.data.msg === "Gaturinhas insuficientes para vender") {
        alert("Gaturinhas insuficientes para vender o álbum!");
      } else {
        alert("Álbum não encontrado ou vazio");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Ocorreu um erro ao tentar vender o álbum.");
    });
  };

  return (
    <div>
      <button className="button2" onClick={venderAlbum}>
        Vender Álbum
      </button>
    </div>
  );
};

export default SellAlbumButton;
