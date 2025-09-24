import React from 'react'

const ActionButtons = ({ 
  diceValue,
  diceRolling,
  currentPlayer,
  move1,
  move2,
  setMove1, 
  setMove2,
  setCopyVal,
  resetGame,
  buttonClick
}) => {
  return (
    <div className="flex md:space-x-8 mt-4 justify-evenly mx-3 mb-3">
            <button
              className="md:px-6 md:py-2 p-2 bg-amber-500 hover:bg-amber-600 rounded-full text-lg font-medium shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (move1) {
                  setMove1(false);
                  setMove2(true);
                  setCopyVal(0);
                } else if (move2) {
                  setMove2(false);
                  setMove1(true);
                  setCopyVal(0);
                }
                buttonClick();
              }}
              disabled={
                diceValue === "PLAY" ||
                diceRolling ||
                currentPlayer === 1 ||
                !move1
              }
            >
              Pass Turn
            </button>

            <button
              className="md:px-6 md:py-2 p-2 py-1  bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-medium shadow-md transition-colors duration-300"
              onClick={() => {
                resetGame();
                buttonClick();
              }}
            >
              Reset Game
            </button>

            <button
              className="md:px-6 md:py-2 p-2 bg-amber-500 hover:bg-amber-600 rounded-full text-lg font-medium shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (move1) {
                  setMove1(false);
                  setMove2(true);
                  setCopyVal(0);
                } else if (move2) {
                  setMove2(false);
                  setMove1(true);
                  setCopyVal(0);
                }
                buttonClick();
              }}
              disabled={
                diceRolling ||
                diceValue === "PLAY" ||
                currentPlayer === 2 ||
                !move2
              }
            >
              Pass Turn
            </button>
          </div>
  );
};

export default ActionButtons;

