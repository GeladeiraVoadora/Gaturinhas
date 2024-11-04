import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css';

interface CardProps {
  gatId: number;
  image: string;
  name: string;
  price: string;
}

const Card: React.FC<CardProps> = ({ gatId, image, name, price }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleBuy = () => {
    if (!email) {
      alert('Você deve estar logado para realizar a compra');
      navigate('/');
      return;
    }
    
    axios.post("http://localhost:3030/compra", {
      gatId,
      email
    })
    .then(response => {
      if (response.data === false) { 
        alert("Você não tem dinheiro suficiente para comprar essa figurinha");
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
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Card;
