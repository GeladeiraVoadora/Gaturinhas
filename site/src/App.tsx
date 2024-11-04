import './App.css';
import React from 'react';
import { Login } from './pages/Authentication/Login';
import { Routes, Route } from 'react-router-dom';
import Store from './pages/Store/Store';
import Home from './pages/Home/Home';
import Inventory from './pages/Invetory/Inventory';
import Trade from './pages/Trade/Trade';
import Cemetery from './pages/Cemetery/cemetery';
import Gatex from './pages/Gatex/Gatex';
import Album from './pages/Album/Album';
import Forge from './pages/Forge/Index';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/store" element={<Store />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/album" element={<Album />} />
      <Route path="/trade" element={<Trade />} />
      <Route path="/cemetery" element={<Cemetery />} />
      <Route path="/gatex" element={<Gatex />} />
      <Route path="/forge" element={<Forge />} />
    </Routes>
  );
};

export default App;
