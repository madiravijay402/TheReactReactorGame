import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GameStateContext } from '../context/GameStateContext';

export const ProtectedRoute = ({ children, requiredLevel }) => {
  const { highestUnlockedLevel } = useContext(GameStateContext);

  if (highestUnlockedLevel < requiredLevel) {
    return <Navigate to="/" replace />;
  }

  return children;
};
