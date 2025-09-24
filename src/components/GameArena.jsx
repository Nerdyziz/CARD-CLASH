import React from 'react'
import PlayerCards from './PlayerCards';

const GameArena = ({ 
  p1Cards, 
  p2Cards, 
  move1, 
  move2, 
  toggleP1Card, 
  toggleP2Card,
  cardClick,
}) => {
  return (
    <div className="arena w-[80%] h-[50vh] mx-auto my-3 flex justify-between items-center ">
          {/* Player 1 */}
          <div className="play1 w-[30%] h-full flex flex-col items-center gap-2 z-10">
            {p1Cards.map((moved, i) => (
              <div
                key={i}
                onClick={
                  move1
                    ? () => {
                        toggleP1Card(i);
                        cardClick();
                      }
                    : undefined
                }
                className={`w-full h-[16%] transition-transform duration-500 cursor-pointer ease-in-out bg-gradient-to-br from-blue-400 to-blue-700 flex justify-center items-center text-3xl rounded-full ${
                  moved ? "translate-x-[116.5%] opacity-50" : "translate-x-0 "
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Player 2 */}
          <div className="play2 w-[30%] h-full flex flex-col gap-2 items-center z-10">
            {p2Cards.map((moved, i) => (
              <div
                key={i}
                onClick={
                  move2
                    ? () => {
                        toggleP2Card(i);
                        cardClick();
                      }
                    : undefined
                }
                className={`w-full h-[16%] transition-transform duration-500 cursor-pointer ease-in-out bg-gradient-to-br from-red-400 to-red-700 flex justify-center items-center text-3xl rounded-full ${
                  moved ? "-translate-x-[117%] opacity-50" : "translate-x-0"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
  );
};

export default GameArena;