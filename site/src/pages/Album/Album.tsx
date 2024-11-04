import React from "react";
import "../Album/Style.css";
import Navbar from "../Components/Navbar";
import CardGridAlbum from "../Components/CardGridAlbum";
import CreateAlbumButton from "../Components/CreateAlbumButton";
import SellAlbumButton from "../Components/SellAlbumButton";
import FeedCatsButton from "../Components/FeedCatsButton";

export const Album: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="create-sell">
        <CreateAlbumButton />
        <SellAlbumButton />
        <FeedCatsButton />
      </div>
      <CardGridAlbum />
    </div>
  );
};

export default Album;
