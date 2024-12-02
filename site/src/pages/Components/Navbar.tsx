import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import Logout from './Logout';

export const Navbar: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img src="https://i.imgur.com/Uk3iJSv.png" alt="Gaturinhas" draggable="false" />
      </div>
      <div className="topbar">
        <nav className="navbar">
          <nav>
            <ul className="nav-bar">
              <li className="nav-item"><Link to='/home'>Home</Link></li>
              <li className="nav-item"><Link to='/gatex'>Gatex</Link></li>
              <li className="nav-item"><Link to='/store'>Store</Link></li>
              <li className="nav-item"><Link to='/inventory'>Inventory</Link></li>
              <li className="nav-item"><Link to='/album'>Album</Link></li>
              <li className="nav-item"><Link to='/trade'>Trade</Link></li>
              <li className="nav-item"><Link to='/cemetery'>Cemetery</Link></li>
              <li className="nav-item"><Link to='/forge'>Forge</Link></li>
              <li className="nav-item"><Link to='/perfil'>Perfil</Link></li>
              <li className="nav-item"><Logout /></li>
            </ul>
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
