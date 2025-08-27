import { useState, useEffect, useRef} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


function App() {
  const [p1Cards, setP1Cards] = useState(Array(6).fill(false));
  const [p2Cards, setP2Cards] = useState(Array(6).fill(false));
  const [diceValue, setDiceValue] = useState("PLAY");
  const [copyVal, setCopyVal] = useState("");
  const [diceRolling, setDiceRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [p1Score, setP1Score] = useState(21);
  const [p2Score, setP2Score] = useState(21);
  const [move1, setMove1] = useState(true);
  const [move2, setMove2] = useState(false);
  const dice = useRef(new Audio("./rolling-dice-2-102706.mp3"));
  const card = useRef(new Audio("./card-sounds-35956.mp3"));
  const click = useRef(new Audio("./button-click-289742.mp3"));
  const win = useRef(new Audio("./success-1-6297.mp3"));
  const background = useRef(new Audio("./happy-relaxing-loop-275487.mp3"));

  useEffect(() => {
    background.current.volume = 0.5;
    background.current.loop = true;
    background.current.play();
  });

  const buttonClick = () => {
    click.current.currentTime = 0;
    click.current.play();
  };
  const diceClick = () => {
    dice.current.currentTime = 0;
    dice.current.play();
  };
  const cardClick = () => {
    card.current.currentTime = 0;
    card.current.play();
  };

  useEffect(() => {
    if (p1Score === 0) {
      win.current.currentTime = 0;
      win.current.play();
       toast.success("🎉 Player 1 is the Winner!", {
    position: "top-center",
    autoClose: 3000,
  });

      resetGame();
    } else if (p2Score === 0) {
      win.current.currentTime = 0;
      win.current.play();
       toast.success("🎉 Player 2 is the Winner!", {
    position: "top-center",
    autoClose: 3000,
  });

      resetGame();
    }
  }, [p1Score, p2Score]);

  const resetGame = () => {
    setP1Cards(Array(6).fill(false));
    setP2Cards(Array(6).fill(false));
    setDiceValue("PLAY");
    setCurrentPlayer(1);
    setP1Score(21);
    setP2Score(21);
    setMove1(true);
    setMove2(false);
  };

  const toggleP1Card = (index) => {
    const newP1 = [...p1Cards];
    const newP2 = [...p2Cards];

    if (!newP1[index]) {
      // Moving card forward
      if (copyVal - (index + 1) >= 0) {
        newP1[index] = true;
        setP1Score((prev) => prev - (index + 1));
        setCopyVal((prev) => prev - (index + 1));

        // Handle collision
        if (newP2[index]) {
          newP2[index] = false;
          setP2Score((prev) => prev + (index + 1));
        }
      } else {
        return; // invalid move
      }
    } else {
      // Undo move
      newP1[index] = false;
      setP1Score((prev) => prev + (index + 1));
      setCopyVal((prev) => prev + (index + 1));
    }

    setP1Cards(newP1);
    setP2Cards(newP2);

    // Switch turn if needed
    setTimeout(() => {
      if (copyVal - (index + 1) === 0) {
        setMove1(false);
        setMove2(true);
      }
    }, 100);
  };

  const toggleP2Card = (index) => {
    const newP2 = [...p2Cards];
    const newP1 = [...p1Cards];

    if (!newP2[index]) {
      if (copyVal - (index + 1) >= 0) {
        newP2[index] = true;
        setP2Score((prev) => prev - (index + 1));
        setCopyVal((prev) => prev - (index + 1));

        if (newP1[index]) {
          newP1[index] = false;
          setP1Score((prev) => prev + (index + 1));
        }
      } else {
        return; // invalid move
      }
    } else {
      newP2[index] = false;
      setP2Score((prev) => prev + (index + 1));
      setCopyVal((prev) => prev + (index + 1));
    }

    setP2Cards(newP2);
    setP1Cards(newP1);

    setTimeout(() => {
      if (copyVal - (index + 1) === 0) {
        setMove2(false);
        setMove1(true);
      }
    }, 100);
  };

  const diceRoll = (player) => {
    if (diceRolling || player !== currentPlayer) return;
    setDiceRolling(true);
    setDiceValue(null);
    setTimeout(() => {
      setDiceRolling(false);
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      setCopyVal(roll);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }, 2000);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header with game title */}
      <div className="text-center py-6 bg-gradient-to-r from-yellow-600 to-yellow-800 shadow-xl relative">
        <h1 className="text-5xl font-bold text-white mb-2">CARD CLASH</h1>
        <p className="text-lg italic text-yellow-200">A Strategic Dice Duel</p>
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
      </div>

      {/* Game info bar */}
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

      {/* Dice and player controls */}
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
            <span className="md:mr-2 hidden">⚔️</span> Player 1 Roll
          </button>

          <div className="relative">
            <div className={`dice-container ${diceRolling ? "rolling" : ""}`}>
              <div className="dice bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-2xl border-4 border-yellow-500 text-yellow-900 font-bold flex items-center justify-center text-4xl w-24 h-24 rounded-xl`">
                {diceValue !== null ? diceValue : "..."}
              </div>
            </div>
            <div className="text-center mt-4 text-yellow-200 font-semibold">
              {diceValue === "PLAY" ? "Roll to start!" : `Value: ${diceValue}`}
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

        {/* Action buttons */}
        <div className="flex md:space-x-8 mt-4 justify-around gap-3 mx-3 mb-3">
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
      </div>

      {/* Game arena */}
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

      {/* Game instructions */}
      <div className="text-center text-sm text-gray-400 mt-8 mb-4 px-4">
        <p>
          How to play: Roll the dice, then use the value to move your cards
          forward. If you land on an opponent's card, it returns to their side!
        </p>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

export default App;
