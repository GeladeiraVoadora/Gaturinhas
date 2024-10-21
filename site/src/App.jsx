import './App.css';
import React from 'react';
import  {Login}  from './pages/Authentication/Login'
import {Routes, Route} from 'react-router-dom';
import Store from './pages/Store/Store.tsx';
import Home from './pages/Home/Home.tsx';
import Inventory from './pages/Invetory/Inventory';
import Trade from './pages/Trade/Trade'
import Cemetery from './pages/Cemetery/cemetery';
import Gatex from  './pages/Gatex/Gatex.tsx';
import Album from './pages/Album/Album';
import Forge from './pages/Forge/Index';
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/store' element={<Store/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/inventory' element={<Inventory/>}></Route>
      <Route path='/album' element={<Album/>}></Route>
      <Route path='/trade' element={<Trade/>}></Route>
      <Route path='/cemetery' element={<Cemetery/>}></Route>
      <Route path='/gatex' element={<Gatex/>}></Route>
      <Route path='/forge' element={<Forge/>}></Route>
     
    
    </Routes>
  );

}

export default App;
