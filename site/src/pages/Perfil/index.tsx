import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../../index.css";

interface Friend {
  id: number;
  name: string;
  image: string;
}

interface Album {
  id: number;
  title: string;
  image: string;
}

const Profile: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [bio, setBio] = useState("A passionate sticker collector and trader.");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userData = {
    friends: [
      { id: 1, name: "Alice", image: "https://via.placeholder.com/100" },
      { id: 2, name: "Bob", image: "https://via.placeholder.com/100" },
      { id: 3, name: "Charlie", image: "https://via.placeholder.com/100" },
    ],
    albums: [
      { id: 1, title: "Album 1", image: "https://via.placeholder.com/150" },
      { id: 2, title: "Album 2", image: "https://via.placeholder.com/150" },
    ],
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-header">
        <h2 className="profile-name">{name || "Nome de usuário"}</h2>
        <p className="profile-bio">{bio}</p>
        <button className="edit-button" onClick={handleOpenModal}>
          Editar Perfil
        </button>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Amigos</h2>
        <div className="friends-list">
          {userData.friends.map((friend: Friend) => (
            <div key={friend.id} className="friend-item">
              <img
                src={friend.image}
                alt={friend.name}
                className="friend-avatar"
              />
              <p>{friend.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Álbuns</h2>
        <div className="albums-list">
          {userData.albums.map((album: Album) => (
            <div key={album.id} className="album-item">
              <img
                src={album.image}
                alt={album.title}
                className="album-image"
              />
              <p>{album.title}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Perfil</h2>
            <div className="modal-field">
              <label htmlFor="modal-name">Nome:</label>
              <input
                type="text"
                id="modal-name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-field">
              <label htmlFor="modal-bio">Bio:</label>
              <textarea
                id="modal-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <button className="save-button" onClick={handleSave}>
              Salvar
            </button>
            <button className="cancel-button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
