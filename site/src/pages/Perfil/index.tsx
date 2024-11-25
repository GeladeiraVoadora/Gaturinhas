import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
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
  const userId = parseInt(localStorage.getItem("userId") || "0", 10);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Nome de usuário",
    bio: "Bio não informada",
    money: 0,
    created_at: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<string>("Nome de usuário");
  const [bio, setBio] = useState<string>("Bio não informada");

  const friends: Friend[] = [
    { id: 1, name: "Alice", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Bob", image: "https://via.placeholder.com/100" },
    { id: 3, name: "Charlie", image: "https://via.placeholder.com/100" },
  ];

  const albums: Album[] = [
    { id: 1, title: "Album 1", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Album 2", image: "https://via.placeholder.com/150" },
  ];

  useEffect(() => {
    if (!userId) {
      setModalOpen(true);
      setModalMessage("Usuário não autenticado!");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/usuario/${userId}`);
        const data = response.data;

        setUserData({
          name: data.name || "Nome de usuário",
          bio: data.bio || "Bio não informada",
          money: data.money || 0,
          created_at: data.created_at || "",
          email: data.email || "",
        });
        setName(data.name || "Nome de usuário");
        setBio(data.bio || "Bio não informada");
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setModalOpen(true);
        setModalMessage("Erro ao buscar dados do usuário.");
      }
    };

    fetchUserData();
  }, [userId]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = async () => {
    try {
      const updatedData = { name, bio };
      await axios.put(`http://localhost:3030/api/usuario/${userId}`, updatedData);

      setUserData((prevData) => ({
        ...prevData,
        name: name || "Nome de usuário",
        bio: bio || "Bio não informada",
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
      setModalOpen(true);
      setModalMessage("Erro ao atualizar os dados do usuário.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (!userId) {
      navigate("/login");
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-header">
        <h2 className="profile-name">{userData.name}</h2>
        <p className="profile-bio">{userData.bio}</p>
        <p className="profile-email">Email: {userData.email}</p>
        <p className="profile-money">Saldo: R$ {userData.money}</p>
        <p className="profile-created">Criado em: {new Date(userData.created_at).toLocaleDateString()}</p>
        <button className="edit-button" onClick={handleOpenModal}>
          Editar Perfil
        </button>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Amigos</h2>
        <div className="friends-list">
          {friends.map((friend: Friend) => (
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
          {albums.map((album: Album) => (
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
                value={bio || ""}
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

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button className="close-button" onClick={handleModalClose}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
