import React from 'react';

export const withDifficulty = (WrappedComponent, level) => {
  return (props) => {
    // Generate some difficulty-based parameters
    const getDifficultyParams = () => {
      switch(level) {
        case 1:
          return { speed: 'Normal', penalty: 'Low', label: 'Component Core - Level 1' };
        case 2:
          return { speed: 'Fast', penalty: 'Medium', label: 'Side Effect Matrix - Level 2' };
        case 3:
          return { speed: 'Ludicrous', penalty: 'High', label: 'Global Override - Level 3' };
        default:
          return { speed: 'Unknown', penalty: 'Unknown', label: 'Unknown Sector' };
      }
    };

    const difficultySettings = getDifficultyParams();

    return (
      <WrappedComponent {...props} difficulty={difficultySettings} />
    );
  };
};
