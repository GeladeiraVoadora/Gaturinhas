import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../index.css';

interface StickerPackStoreProps {
  pacId: number;
  image: string;
  name: string;
  price: string;
}

const StickerPackStore: React.FC<StickerPackStoreProps> = ({ pacId, image, name, price }) => {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleBuy = () => {
    if (!email) {
      alert('Você deve estar logado para realizar a compra');
      navigate('/');
      return;
    }

    axios.post("http://localhost:3030/api/compra/Pac", {
      pacId: pacId,
      email: email
    })
    .then(response => {
      if (response.data === false) { 
        alert("Você não tem dinheiro suficiente para comprar o pacote de figurinhas");
      } else {
        alert("Compra realizada");
      }
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      alert("Ocorreu um erro ao realizar a compra");
    });
  };

  return (
    <div className="stickerPack">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default StickerPackStore;
