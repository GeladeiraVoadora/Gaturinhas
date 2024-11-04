import React, { useState, useEffect } from "react";
import Axios from "axios";
import audioFile from "../../Assets/GatinhoAlimentado.mp3";

export const Button: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [audio] = useState<HTMLAudioElement>(new Audio(audioFile));

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId") || "0", 10);
    if (!userId) {
      return;
    }

    Axios.get(`http://localhost:3030/album/${userId}/lastClickedDate`)
      .then((response) => {
        const lastClickedDate: string = response.data.catFed;
        const today = new Date().toISOString().slice(0, 10);

        if (!lastClickedDate || lastClickedDate !== today) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const feedCats = () => {
    const userId = parseInt(localStorage.getItem("userId") || "0", 10);
    if (!userId) {
      return;
    }

    Axios.put(`http://localhost:3030/album/feed/${userId}`)
      .then((response) => {
        if (response.data === true) {
          audio.play();
          alert("Gatinhos Alimentados!");

          setDisabled(true);
          const today = new Date().toISOString().slice(0, 10);
          Axios.put(`http://localhost:3030/album/${userId}/UpdatelastClickedDate`, { catFed: today });
        } else {
          alert("Gaturinhas Insuficientes para alimentar!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="dailyButton">
      <button disabled={disabled} onClick={feedCats}>
        Alimentar Gatinhos
      </button>
    </div>
  );
};

export default Button;
