import React from "react";
import Navbar from '../Components/Navbar';
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
  const userData = {
    name: "John Doe",
    bio: "A passionate sticker collector and trader.",
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

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="profile-avatar"
        />
        <h1 className="profile-name">{userData.name}</h1>
        <p className="profile-bio">{userData.bio}</p>
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
    </div>
  );
};

export default Profile;
