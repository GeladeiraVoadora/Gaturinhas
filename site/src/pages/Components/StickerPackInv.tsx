import React from "react";
import axios from "axios";
import '../../index.css';

interface StickerPackStoreProps {
  pacprodId: number;
  image: string;
  name: string;
}

const StickerPackStore: React.FC<StickerPackStoreProps> = ({ pacprodId, image, name }) => {
  const invId = parseInt(localStorage.getItem('invId') || "0", 10);

  const handleAllOpen = () => {
    axios.post(`http://localhost:3030/openAllPacks`, {
      invId: invId
    })
    .then(response => {
      console.log(invId);
      alert("Você acabou de abrir os pacotes, cuidado com a enxurrada de figurinhas!");
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      alert("Ocorreu um erro ao abrir os pacotes");
    });
  };

  const handleOpen = () => {
    axios.post(`http://localhost:3030/openpack/`, {
      pacprodId: pacprodId,
      invId: invId
    })
    .then(response => {
      console.log(pacprodId);
      console.log(invId);
      alert("Você acabou de abrir o pacote, dê uma olhada nas suas novas figurinhas!");
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      alert("Ocorreu um erro ao abrir o pacote");
    });
  };

  return (
    <div className="stickerPack">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <button onClick={handleOpen}>Abrir</button>
      <button onClick={handleAllOpen}>Abrir todos</button>
    </div>
  );
};

export default StickerPackStore;
