import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameStateContext } from '../context/GameStateContext';
import { Lock, Unlock } from 'lucide-react';

export default function LandingPage() {
  const [viewState, setViewState] = useState('hero'); // 'hero', 'login', 'dashboard'
  const [tempName, setTempName] = useState('');
  const { playerName, setPlayerName, rank, highestUnlockedLevel } = useContext(GameStateContext);
  const navigate = useNavigate();

  const handleHeroClick = () => setViewState('login');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      setViewState('dashboard');
    }
  };

  return (
    <div className="starry-bg min-h-screen flex flex-col items-center justify-center p-4">
      {viewState === 'hero' && (
        <div className="flex flex-col items-center justify-center transition-all duration-500">
          <h1 className="text-5xl md:text-7xl font-mono text-green-500 mb-12 tracking-wider text-center drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">
            THE REACT REACTOR
          </h1>
          <button
            onClick={handleHeroClick}
            className="animate-pulse bg-green-500 text-black font-bold font-mono px-8 py-4 rounded hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all duration-300"
          >
            PLAY NOW
          </button>
        </div>
      )}

      {viewState === 'login' && (
        <div className="flex flex-col items-center justify-center transition-all duration-500 w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-mono text-green-500 mb-8 tracking-wide drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] scale-90">
            THE REACT REACTOR
          </h1>
          <form 
            onSubmit={handleLoginSubmit}
            className="w-full flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="text"
              autoFocus
              placeholder="Enter Technician Name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 bg-zinc-900 border border-green-500/50 text-white font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.2)]"
            />
            <button
              type="submit"
              className="bg-green-500 text-black font-bold font-mono px-6 py-3 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition"
            >
              INITIALIZE
            </button>
          </form>
        </div>
      )}

      {viewState === 'dashboard' && <DashboardView />}
    </div>
  );
}

const DashboardView = () => {
  const { playerName, rank, highestUnlockedLevel } = useContext(GameStateContext);
  const navigate = useNavigate();

  const [warningMessage, setWarningMessage] = useState(null);

  const nodes = [
    { id: 1, name: 'Component Core', route: '/level-1' },
    { id: 2, name: 'Side Effect Matrix', route: '/level-2' },
    { id: 3, name: 'Global Override', route: '/level-3' },
  ];

  const handleNodeClick = (nodeId, route) => {
    if (highestUnlockedLevel >= nodeId) {
      navigate(route);
    } else {
      setWarningMessage(`Complete previous level (Level ${nodeId - 1}) to proceed.`);
      setTimeout(() => setWarningMessage(null), 3000);
    }
  };

  return (
    <div className="w-full h-full min-h-screen pt-4 px-4 flex flex-col max-w-6xl mx-auto">
      <header className="bg-zinc-950 border-b border-green-500/50 p-4 flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 font-mono">
        <div className="text-emerald-400">
          <span className="text-white">Status:</span> [{rank}]
        </div>
        <div className="text-amber-400 font-bold text-lg hidden sm:block">
          REACTOR DASHBOARD
        </div>
        <div className="text-green-500">
          <span className="text-white">Technician:</span> {playerName}
        </div>
      </header>
      
      {/* Warning display space */}
      <div className="h-8 mb-4 text-center font-mono font-bold text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
        {warningMessage}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {nodes.map(node => {
          const isUnlocked = highestUnlockedLevel >= node.id;
          
          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id, node.route)}
              className={`
                bg-zinc-950 p-6 flex flex-col justify-between aspect-square w-full relative cursor-pointer
                transition-all duration-300 group
                ${isUnlocked 
                  ? 'border border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] opacity-100 hover:scale-[1.02]' 
                  : 'border border-zinc-700 opacity-60 hover:opacity-80'
                }
              `}
            >
              {/* Background Glow specifically for unlocked */}
              {isUnlocked && (
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              
              <div className="flex justify-between items-start z-10">
                <span className="text-sm text-green-900 font-bold tracking-widest uppercase">
                  NODE 0{node.id}
                </span>
                {isUnlocked ? (
                  <Unlock size={20} className="text-green-500" />
                ) : (
                  <Lock size={20} className="text-zinc-500" />
                )}
              </div>
              
              <div className="z-10">
                <h2 className={`text-2xl mt-4 mb-2 ${isUnlocked ? 'text-green-400' : 'text-zinc-400'}`}>
                  {node.name}
                </h2>
                <div className="h-1 w-12 bg-zinc-800">
                  {isUnlocked && <div className="h-full bg-green-500 w-full" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
