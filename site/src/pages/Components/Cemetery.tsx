import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../index.css";

interface CardData {
  gatId: number;
  image: string;  // Usaremos essa propriedade para a URL da imagem
  name: string;
  price: string;
  type: string;
}

const userId = localStorage.getItem("userId"); // Supondo que você armazene o ID do usuário no localStorage

const Cemetery: React.FC = () => {
  const [deletedCards, setDeletedCards] = useState<CardData[]>([]);

  useEffect(() => {
    console.log("Fetching deleted cards...");

    // Fazendo a requisição para buscar os gatinhos falecidos
    Axios.get(`http://localhost:3030/api/cemiterio/${userId}`)
      .then((response) => {
        console.log("Response data:", response.data);

        // resposta está em response.data.listaGats
        const deletedItems = response.data.listaGats.map((card: any) => ({
          ...card,
          image: card.image || "https://th.bing.com/th/id/R.281f39f5df031aa4a6ec4c1eb26d73df?rik=Lpr4urnoxKxYbQ&pid=ImgRaw&r=0&sres=1&sresct=1", // Definindo uma imagem padrão
        }));

        setDeletedCards(deletedItems.reverse());
      })
      .catch((error) => {
        console.log("Erro ao buscar gatinhos falecidos:", error);
      });
  }, []);

  const handleRecover = (gatId: number) => {
    console.log(`Recovering card with ID ${gatId}...`);

    // Fazendo a requisição para reviver o gatinho
    Axios.post("http://localhost:3030/api/reviver", { gatId })
      .then(() => {
        // Após reviver, removemos o gatinho da lista de falecidos
        setDeletedCards((prevCards) =>
          prevCards.filter((card) => card.gatId !== gatId)
        );
      })
      .catch((error) => {
        console.log("Erro ao reviver o gatinho", error);
      });
  };

  if (!deletedCards || deletedCards.length === 0) {
    return <p className="Alert">Nenhum gatinho falecido para reviver.</p>;
  }

  return (
    <div className="cemetery-container">
      <h2>Cemitério de Gatinhos</h2>
      <div className="cemetery-grid">
        {deletedCards.map((card) => (
          <div key={card.gatId} className="tombstone">
            <div className="tombstone-image">
              <img src={card.image} alt={card.name} />
            </div>
            <div className="tombstone-details">
              <h3>{card.name}</h3>
              <p className="price-style">Preço: {card.price}</p>
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
    </div>
  );
};

export default Cemetery;
