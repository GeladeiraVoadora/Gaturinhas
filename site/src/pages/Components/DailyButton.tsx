import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Button: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    Axios.get(`http://localhost:3030/daily/${userId}/lastClickedDate`)
      .then((response) => {
        const lastClickedDate: string = response.data.click;
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

  const handleCollectReward = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    Axios.put(`http://localhost:3030/daily/${userId}`, { money: 10 })
      .then(() => {
        alert("Coins obtained!");
        setDisabled(true);
        const today = new Date().toISOString().slice(0, 10);

        Axios.put(`http://localhost:3030/daily/${userId}/UpdatelastClickedDate`, { click: today });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="dailyButton">
      <button disabled={disabled} onClick={handleCollectReward}>
        Collect your daily coins
      </button>
    </div>
  );
};

export default Button;
