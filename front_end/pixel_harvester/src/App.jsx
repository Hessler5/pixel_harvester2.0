import React from 'react';
import './App.css'
import './index.css'
import Header from '../../pixel_harvester/src/components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className = "background h-dvh">
      <Outlet />
    </div>
  )
}

export default App

