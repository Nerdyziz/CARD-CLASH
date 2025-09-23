import React from 'react'

const Header = () => {
  return (
    <div className="text-center py-6 bg-gradient-to-r from-yellow-600 to-yellow-800 shadow-xl relative">
      <h1 className="text-5xl font-bold text-white mb-2">CARD CLASH</h1>
      <p className="text-lg italic text-yellow-200">A Strategic Dice Duel</p>
      <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
    </div>
  );
};

export default Header;