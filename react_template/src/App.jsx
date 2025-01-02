// src/App.jsx
import React, { useState, useEffect } from 'react';
import Game from './Game';
import './Game.css';

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Game />
    </div>
  );
}

export default App;