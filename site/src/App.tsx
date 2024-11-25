import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Store from './pages/Store/Store';
import Home from './pages/Home/Home';
import Inventory from './pages/Invetory/Inventory';
import Trade from './pages/Trade/Trade';
import Cemetery from './pages/Cemetery/cemetery';
import Gatex from './pages/Gatex/Gatex';
import Album from './pages/Album/Album';
import Forge from './pages/Forge/Index';
import Perfil from './pages/Perfil/index';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/store" element={<Store />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/album" element={<Album />} />
      <Route path="/trade" element={<Trade />} />
      <Route path="/cemetery" element={<Cemetery />} />
      <Route path="/gatex" element={<Gatex />} />
      <Route path="/forge" element={<Forge />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
};

export default App;
