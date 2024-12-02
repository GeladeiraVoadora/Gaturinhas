import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import "../../index.css";

interface Friend {
  userId: number;
  email: string;
  name: string | null;
  created_at: string;
  bio: string | null;
}

interface Album {
  name: string;
  image: string;
  type: string;
  desc: string;
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
    friends: [] as Friend[],
  });
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newFriendId, setNewFriendId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<string>("Nome de usuário");
  const [bio, setBio] = useState<string>("Bio não informada");

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
          friends: data.friends || [],
        });
        setName(data.name || "Nome de usuário");
        setBio(data.bio || "Bio não informada");
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setModalOpen(true);
        setModalMessage("Erro ao buscar dados do usuário.");
      }
    };

    const fetchUserAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/album/${userId}`);
        const data = response.data;

        if (data.result && Array.isArray(data.gaturinhas)) {
          setAlbums(data.gaturinhas);
        } else {
          console.warn("Formato inesperado de resposta para álbuns:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar álbuns do usuário:", error);
      }
    };

    fetchUserData();
    fetchUserAlbums();
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

  const handleAddFriend = async () => {
    if (newFriendId === null) {
      setModalMessage("Digite um ID válido para adicionar um amigo.");
      setModalOpen(true);
      return;
    }

    try {
      await axios.post(`http://localhost:3030/api/usuario/${userId}/addFriend`, {
        friendId: newFriendId,
      });

      setModalMessage("Amigo adicionado com sucesso!");
      setModalOpen(true);

      // Recarregar a lista de amigos
      const response = await axios.get(`http://localhost:3030/api/usuario/${userId}`);
      setUserData((prevData) => ({
        ...prevData,
        friends: response.data.friends || [],
      }));
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
      setModalMessage("Erro ao adicionar amigo.");
      setModalOpen(true);
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
        <h2 className="section-title">Adicionar Amigo</h2>
        <div className="add-friend-form">
          <input
            type="number"
            placeholder="Digite o ID do amigo"
            value={newFriendId || ""}
            onChange={(e) => setNewFriendId(parseInt(e.target.value, 10) || null)}
          />
          <button onClick={handleAddFriend}>Adicionar</button>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Amigos</h2>
        <div className="friends-list">
          {userData.friends.length > 0 ? (
            userData.friends.map((friend: Friend) => (
              <div key={friend.userId} className="friend-item">
                <p><strong>Nome:</strong> {friend.name || "Não informado"}</p>
                <p><strong>Email:</strong> {friend.email}</p>
                <p><strong>Bio:</strong> {friend.bio || "Sem bio disponível"}</p>
                <p><strong>Adicionado em:</strong> {new Date(friend.created_at).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>Você ainda não tem amigos cadastrados.</p>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Álbum</h2>
        <div className="albums-list">
          {albums.length > 0 ? (
            albums.map((album, index) => (
              <div key={index} className="album-item">
                <img src={album.image} alt={album.name} className="album-image" />
                <h3>{album.name}</h3>
                <p>Tipo: {album.type}</p>
                <p>{album.desc}</p>
              </div>
            ))
          ) : (
            <p>Nenhum álbum encontrado.</p>
          )}
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
