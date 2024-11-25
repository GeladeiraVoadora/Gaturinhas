import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../index.css";

interface CardData {
  gatId: number;
  image: string;
  name: string;
  price: string;
  type: string;
}

const Cemetery: React.FC = () => {
  const [deletedCards, setDeletedCards] = useState<CardData[]>([]);

  useEffect(() => {
    console.log("Fetching deleted cards...");
    axios
      .get("http://localhost:3030/api/gatex") // Usando a mesma rota
      .then((response) => {
        // Filtra apenas as figurinhas deletadas (simulação)
        const deletedItems = response.data.filter(
          (card: CardData) => card.type === "Deleted" // Simulando itens deletados
        );
        setDeletedCards(deletedItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRecover = (gatId: number) => {
    console.log(`Recovering card with ID ${gatId}...`);
    // Aqui poderia ir uma requisição para recuperar o item, se a API suportar
    setDeletedCards((prevCards) =>
      prevCards.filter((card) => card.gatId !== gatId)
    );
  };

  return (
    <div className="cemetery-container">
      <h2>Cemitério de Figurinhas</h2>
      {deletedCards.length > 0 ? (
        <div className="cemetery-grid">
          {deletedCards.map((card) => (
            <div key={card.gatId} className="tombstone">
              <div className="tombstone-image">
                <img src={card.image} alt={card.name} />
              </div>
              <div className="tombstone-details">
                <h3>{card.name}</h3>
                <p>Preço: {card.price}</p>
                <button
                  className="recover-button"
                  onClick={() => handleRecover(card.gatId)}
                >
                  Reviver
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cards-message">Nenhuma figurinha para recuperar.</p>
      )}
    </div>
  );
};

export default Cemetery;
