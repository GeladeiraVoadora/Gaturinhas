import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import Logout from './Logout';

export const Navbar: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img
          src="https://media.discordapp.net/attachments/1081023068358590586/1081023228631318579/nome-removebg-preview.png"
          alt="Gaturinhas"
          draggable="false"
        />
      </div>
      <div className="topbar">
        <nav className="navbar">
          <ul className="nav-bar">
            <li className="nav-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/gatex">Gatex</Link>
            </li>
            <li className="nav-item">
              <Link to="/store">Store</Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory">Inventory</Link>
            </li>
            <li className="nav-item">
              <Link to="/album">Album</Link>
            </li>
            <li className="nav-item">
              <Link to="/trade">Trade</Link>
            </li>
            <li className="nav-item">
              <Link to="/cemetery">Cemetery</Link>
            </li>
            <li className="nav-item">
              <Link to="/forge">Forge</Link>
            </li>
            <li className="nav-item">
              <Logout />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
