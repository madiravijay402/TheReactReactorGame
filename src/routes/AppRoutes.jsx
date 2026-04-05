import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import { ProtectedRoute } from '../protector/ProtectedRoute';
import { withDifficulty } from '../hoc/withDifficulty';
import Level1Game from '../pages/Level1Game';

const GenericLevel = ({ difficulty }) => {
  const navigate = useNavigate();
  return (
    <div className="starry-bg min-h-screen flex flex-col items-center justify-center">
      <div className="bg-zinc-950 border border-green-500/50 p-8 text-center max-w-lg w-full">
        <h1 className="text-3xl font-mono text-green-500 mb-4">{difficulty.label}</h1>
        <p className="font-mono text-emerald-400 mb-2">Speed Requirement: {difficulty.speed}</p>
        <p className="font-mono text-amber-400 mb-8">Penalty Level: {difficulty.penalty}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 text-black font-bold px-6 py-2 rounded hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

const Level1 = withDifficulty(GenericLevel, 1);
const Level2 = withDifficulty(GenericLevel, 2);
const Level3 = withDifficulty(GenericLevel, 3);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/level-1" 
        element={
          <ProtectedRoute requiredLevel={1}>
            <Level1Game />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/level-2" 
        element={
          <ProtectedRoute requiredLevel={2}>
            <Level2 />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/level-3" 
        element={
          <ProtectedRoute requiredLevel={3}>
            <Level3 />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};
