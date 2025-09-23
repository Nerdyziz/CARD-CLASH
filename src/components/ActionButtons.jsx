import React from 'react'

const ActionButtons = ({ 
  move1, 
  move2, 
  diceValue, 
  diceRolling, 
  currentPlayer, 
  onPassTurn, 
  onResetGame, 
  onButtonClick 
}) => {
  return (
    <div className="flex md:space-x-8 mt-4 justify-evenly gap-3 mx-3 pb-6">
      <button
        className="md:px-6 md:py-2 p-2 bg-amber-500 hover:bg-amber-600 rounded-full text-lg font-medium shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          onPassTurn();
          onButtonClick();
        }}
        disabled={
          diceValue === "PLAY" || diceRolling || currentPlayer === 1 || !move1
        }
      >
        Pass Turn
      </button>

      <button
        className="md:px-6 md:py-2 p-2 py-1 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-medium shadow-md transition-colors duration-300"
        onClick={() => {
          onResetGame();
          onButtonClick();
        }}
      >
        Reset Game
      </button>

      <button
        className="md:px-6 md:py-2 p-2 bg-amber-500 hover:bg-amber-600 rounded-full text-lg font-medium shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          onPassTurn();
          onButtonClick();
        }}
        disabled={
          diceRolling || diceValue === "PLAY" || currentPlayer === 2 || !move2
        }
      >
        Pass Turn
      </button>
    </div>
  );
};

export default ActionButtons;

