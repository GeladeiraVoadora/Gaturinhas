import './Style.css';
import Navbar from '../Components/Navbar.tsx';
import CardGrid from '../Components/CardGrid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir a interface para tipar o usuário
interface User {
  money: number;
}

export function Store() {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3030/usuario/${userId}/money`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  return (
    <div className="storeContainer">
      <Navbar />
      {user && <p className="gatoedas">Gatoedas: {user.money}</p>}
      <CardGrid />
    </div>
  );
}

export default Store;
