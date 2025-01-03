// src/App.jsx
import React, { useState, useEffect } from 'react';
import Game from './Game';
import './Game.css';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">2048 Game</h1>
      <Game />
    </div>
  );
}

export default App;