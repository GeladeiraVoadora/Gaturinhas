import './Style.css';
import Navbar from '../Components/Navbar';
import CardGrid from '../Components/CardGrid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  money: number;
}

export const Store: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3030/api/usuario/${userId}/money`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
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
};

export default Store;
