import React from 'react'
import PlayerCards from './PlayerCards';

const GameArena = ({ 
  p1Cards, 
  p2Cards, 
  move1, 
  move2, 
  onP1CardClick, 
  onP2CardClick, 
  onCardClickSound 
}) => {
  return (
    <div className="arena w-[80%] h-[50vh] mx-auto my-3 flex justify-between items-center">
      <PlayerCards 
        player={1}
        cards={p1Cards}
        moveEnabled={move1}
        onCardClick={onP1CardClick}
        onCardClickSound={onCardClickSound}
      />
      
      <PlayerCards 
        player={2}
        cards={p2Cards}
        moveEnabled={move2}
        onCardClick={onP2CardClick}
        onCardClickSound={onCardClickSound}
      />
    </div>
  );
};

export default GameArena;