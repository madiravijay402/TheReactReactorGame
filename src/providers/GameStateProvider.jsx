import React, { useState } from 'react';
import { GameStateContext } from '../context/GameStateContext';

export const GameStateProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [rank, setRank] = useState('Initiate');
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState(1);

  const value = {
    playerName,
    setPlayerName,
    rank,
    setRank,
    highestUnlockedLevel,
    setHighestUnlockedLevel
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
