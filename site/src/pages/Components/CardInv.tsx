import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css';

interface CardProps {
  prodId: number;
  image: string;
  name: string;
}

const Card: React.FC<CardProps> = ({ prodId, image, name }) => {
  const userId = parseInt(localStorage.getItem('userId') || "0", 10);
  const navigate = useNavigate();

  const colar = () => {
    if (!userId) {
      alert('Você deve estar logado para colar');
      navigate('/');
      return;
    }

    axios.put(`http://localhost:3030/api/album/stick/${userId}`, {
      prodId: prodId,
    })
    .then(response => {
      if (response.data === false) { 
        alert("Não foi possível colar a figurinha");
      } else {
        alert("Colado!");
      }
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      alert("Ocorreu um erro ao realizar a colagem");
    });
  };

  // const vender = () => {
  //   if (!userId) {
  //       alert('Você deve estar logado para vender');
  //       navigate('/');
  //       return;
  //   }
  //   axios.put(`http://localhost:3030/api/album/stick/${userId}`, {
  //     prodId: prodId,
  //   })
  //   .then(response => {
  //     if (response.data === false){ 
  //       alert("Não foi possível colar a figurinha")
  //     }
  //     else{
  //       alert("Colado!")
  //     }
  //     console.log(response.data)
  //     window.location.reload();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     alert("Ocorreu um erro ao realizar a colagem");
  //   });
  // };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <button onClick={colar}>Stick</button>
      {/* <button onClick={vender}>Sell</button> */}
    </div>
  );
};

export default Card;
