import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

const Forge: React.FC = () => {
  const [collectedCardIds, setCollectedCardIds] = useState<number[]>([]); // IDs das cartas coletadas
  const [isComplete, setIsComplete] = useState<boolean>(false); // Se o Exodia está completo
  const [loading, setLoading] = useState<boolean>(false);
  const userId = 1; // Substitua pelo ID dinâmico do usuário, se necessário
  const API_BASE_URL = "http://localhost:3030/api/exodia"; // URL base para suas rotas

  // Função para buscar o progresso do Exodia
  const fetchProgress = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/progress/${userId}`);
      // console.log(data);
      setCollectedCardIds(data.collectedCardIds || []); // Atualiza as cartas coletadas
      setIsComplete(data.completed || false); // Define se o Exodia está completo
    } catch (error) {
      console.error("Erro ao buscar progresso do Exodia:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para completar a forja do Exodia
  const completeExodia = async () => {
    if (collectedCardIds.length < 5) {
      alert("Você ainda não tem todas as cartas necessárias para completar o Exodia!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_BASE_URL}/complete/${userId}`);
      alert(data.message || "Exodia completado com sucesso!");
      setIsComplete(true);
    } catch (error) {
      console.error("Erro ao completar o Exodia:", error);
      alert("Erro ao completar o Exodia. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar progresso ao carregar o componente
  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="forge-container">
      <Navbar />
      <h2>Forjar Cartas</h2>
      <div className="cards-container">
        {/* Renderiza os slots das cartas com base nas IDs coletadas */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`card-slot ${
              collectedCardIds.length > index ? "filled" : "empty"
            }`}
          >
            {collectedCardIds.length > index ? (
              <img
                src={`https://example.com/cards/card-${collectedCardIds[index]}.png`} // Substitua pelo URL correto das cartas
                alt={`Carta ${collectedCardIds[index]}`}
                className="card-image"
              />
            ) : (
              <span className="placeholder">Slot {index + 1}</span>
            )}
          </div>
        ))}
      </div>
      <button
        className="forge-button"
        onClick={completeExodia}
        disabled={loading || isComplete}
      >
        {loading
          ? "Forjando..."
          : isComplete
          ? "Exodia Completo!"
          : "Forjar"}
      </button>
    </div>
  );
};

export default Forge;
