import React from 'react'

const Scoreboard = ({ p1Score, p2Score, move1 }) => {
  return (
    <div className="flex justify-between items-center px-8 py-3 bg-gray-700 bg-opacity-70">
          <div className="text-center">
            <div className="text-sm text-gray-300">Player 1 Score</div>
            <div className="text-2xl font-bold text-blue-400">{p1Score}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-300">Current Turn</div>
            <div className="text-2xl font-bold text-yellow-400">
              Player {move1 ? "1" : "2"}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-300">Player 2 Score</div>
            <div className="text-2xl font-bold text-red-400">{p2Score}</div>
          </div>
        </div>
  );
};

export default Scoreboard;