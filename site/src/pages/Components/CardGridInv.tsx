import React, { useState, useEffect } from "react";
import Card from "./CardInv";
import '../../index.css';
import Axios from "axios";
import StickerPackInv from "./StickerPackInv";

const invId = localStorage.getItem('invId');

interface CardData {
  prodId: number;
  image: string;
  name: string;
}

interface StickerPackData {
  pacprodId: number;
  image: string;
  name: string;
  price: string;
}

const CardGridInv: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [stickerPack, setStickerPack] = useState<StickerPackData[] | null>(null);

  useEffect(() => {
    console.log("Fetching cards...");
    
    Axios.get(`http://localhost:3030/api/inventario/${invId}`)
      .then((response) => {
        console.log(response);
        setCards(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(`http://localhost:3030/api/inventario/Pac/${invId}`)
      .then((response) => {
        setStickerPack(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!cards || !stickerPack || (cards.length === 0 && stickerPack.length === 0)) {
    return <p className="Alert">Você não tem figurinhas</p>;
  }

  return (
    <div className="card-grid">
      {stickerPack && stickerPack.map((pack) => (
        <StickerPackInv 
          key={pack.pacprodId} 
          pacprodId={pack.pacprodId} 
          image={pack.image} 
          name={pack.name} 
          // price={pack.price} 
        />
      ))}
      {Array.isArray(cards) && cards.map((card) => (
        <Card 
          key={card.prodId}
          prodId={card.prodId} 
          image={card.image} 
          name={card.name} 
        />
      ))}
    </div>
  );
};

export default CardGridInv;
