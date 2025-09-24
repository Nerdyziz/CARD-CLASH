import React from 'react'

const DiceControls = ({ 
diceRoll,
diceRolling,
diceValue,
currentPlayer,
move1,
move2,
buttonClick,
diceClick

}) => {
  return (
    <>
    <div className="flex flex-col items-center my-8">
          <div className="flex md:justify-center items-center md:space-x-12 md:mb-6 justify-around gap-3 mx-3">
            <button
              className="md:px-8 md:py-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-full md:text-xl text-md font-bold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              onClick={() => {
                diceRoll(1);
                buttonClick();
                diceClick();
              }}
              disabled={currentPlayer !== 1 || diceRolling || !move1}
            >
            Player 1 Roll
            </button>

            <div className="relative">
              <div className={`dice-container ${diceRolling ? "rolling" : ""}`}>
                <div className="dice bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-2xl border-4 border-yellow-500 text-yellow-900 font-bold flex items-center justify-center text-4xl w-24 h-24 rounded-xl`">
                  {diceValue !== null ? diceValue : "..."}
                </div>
              </div>
              <div className="text-center mt-4 text-yellow-200 font-semibold">
                {diceValue === "PLAY"
                  ? "Roll to start!"
                  : `Value: ${diceValue}`}
              </div>
            </div>

            <button
              className="md:px-8 md:py-3 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full md:text-xl text-md font-bold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              onClick={() => {
                diceRoll(2);
                buttonClick();
                diceClick();
              }}
              disabled={currentPlayer !== 2 || diceRolling || !move2}
            >
              Player 2 Roll <span className="md:ml-2 hidden">⚔️</span>
            </button>
          </div>
    </div>
    </>
  );
};

export default DiceControls;
