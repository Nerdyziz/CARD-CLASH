import React from "react";

const PlayerCards = ({ 
  player, 
  cards, 
  moveEnabled, 
  onCardClick, 
  onCardClickSound 
}) => {
  const isPlayer1 = player === 1;
  
  return (
    <div className={`play${player} w-[30%] h-full flex flex-col ${isPlayer1 ? 'items-center' : 'items-center'} gap-2 z-10`}>
      {cards.map((moved, i) => (
        <div
          key={i}
          onClick={
            moveEnabled
              ? () => {
                  onCardClick(i);
                  onCardClickSound();
                }
              : undefined
          }
          className={`w-full h-[16%] transition-transform duration-500 cursor-pointer ease-in-out bg-gradient-to-br ${
            isPlayer1 
              ? 'from-blue-400 to-blue-700' 
              : 'from-red-400 to-red-700'
          } flex justify-center items-center text-3xl rounded-full ${
            moved 
              ? (isPlayer1 ? "translate-x-[116.5%] opacity-50" : "-translate-x-[117%] opacity-50") 
              : "translate-x-0"
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default PlayerCards;
