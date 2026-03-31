import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GameStateProvider } from './providers/GameStateProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <GameStateProvider>
        <AppRoutes />
      </GameStateProvider>
    </BrowserRouter>
  );
}

export default App;
