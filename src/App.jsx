import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Header from "./components/Header";
import Scoreboard from "./components/Scorecard";
import DiceControls from "./components/DiceControls";
import ActionButtons from "./components/ActionButtons";
import GameArena from "./components/GameArena";
import Instructions from "./components/Instructions";
function App() {
  const [p1Cards, setP1Cards] = useState(Array(6).fill(false));
  const [p2Cards, setP2Cards] = useState(Array(6).fill(false));
  const [p1Pev, setP1Pev] = useState(Array(6).fill(false));
  const [p2Pev, setP2Pev] = useState(Array(6).fill(false));
  const [diceValue, setDiceValue] = useState("PLAY");
  const [copyVal, setCopyVal] = useState(-1);
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
      setTimeout(() => resetGame(), 3000);
    } else if (p2Score === 0) {
      win.current.currentTime = 0;
      win.current.play();
      toast.success("🎉 Player 2 is the Winner!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => resetGame(), 3000);
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
    const newP1Pev = [...p1Pev];
    const newP2Pev = [...p2Pev];
    let newCopyVal = copyVal;
    if (!newP1[index]) {
      // Moving card forward

      if (newCopyVal - (index + 1) >= 0) {
        newP1Pev[index] = newP1[index];
        newP1[index] = true;

        setP1Score((prev) => prev - (index + 1));
        setCopyVal(newCopyVal - (index + 1));

        // Handle collision
        if (newP2[index]) {
          newP2Pev[index] = newP2[index];
          newP2[index] = false;
          setP2Score((prev) => prev + (index + 1));
        }
        setTimeout(() => {
          if (newCopyVal - (index + 1) === 0) {
            setMove1(false);
            setMove2(true);
          }
        }, 100);
      } else {
        return; // invalid move
      }
    } else {
      // Undo move
      newP1[index] = false;
      if (newP2Pev[index]) {
        newP2[index] = true;
        setP2Score((prev) => prev - (index + 1));
        newP2Pev[index] = false;
      }
      setP1Score((prev) => prev + (index + 1));
      setCopyVal(newCopyVal + (index + 1));
    }
    setP1Cards(newP1);
    setP2Cards(newP2);
    setP1Pev(newP1Pev);
    setP2Pev(newP2Pev);

    // Switch turn if needed
  };

  const toggleP2Card = (index) => {
    const newP2 = [...p2Cards];
    const newP1 = [...p1Cards];
    const newP1Pev = [...p1Pev];
    const newP2Pev = [...p2Pev];
    let newCopyVal = copyVal;
    if (!newP2[index]) {
      if (newCopyVal - (index + 1) >= 0) {
        newP2Pev[index] = newP2[index];
        newP2[index] = true;
        setP2Score((prev) => prev - (index + 1));
        setCopyVal(newCopyVal - (index + 1));

        if (newP1[index]) {
          newP1Pev[index] = newP1[index];
          newP1[index] = false;
          setP1Score((prev) => prev + (index + 1));
        }
        setTimeout(() => {
          if (newCopyVal - (index + 1) === 0) {
            setMove2(false);
            setMove1(true);
          }
        }, 100);
      } else {
        return; // invalid move
      }
    } else {
      newP2[index] = false;
      if (newP1Pev[index]) {
        newP1[index] = true;
        setP1Score((prev) => prev - (index + 1));
        newP1Pev[index] = false;
      }
      setP2Score((prev) => prev + (index + 1));
      setCopyVal(newCopyVal + (index + 1));
    }

    setP2Cards(newP2);
    setP1Cards(newP1);
    setP1Pev(newP1Pev);
    setP2Pev(newP2Pev);
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
        <Header />

        {/* Game info bar */}
        <Scoreboard p1Score={p1Score} p2Score={p2Score} move1={move1} />
        {/* Dice and player controls */}
        <DiceControls
          diceRoll={diceRoll}
          diceRolling={diceRolling}
          diceValue={diceValue}
          currentPlayer={currentPlayer}
          move1={move1}
          move2={move2}
          buttonClick={buttonClick}
          diceClick={diceClick}
        />

        {/* Action buttons */}
        <ActionButtons
          diceValue={diceValue}
          diceRolling={diceRolling}
          currentPlayer={currentPlayer}
          move1={move1}
          move2={move2}
          setMove1={setMove1}
          setMove2={setMove2}
          setCopyVal={setCopyVal}
          resetGame={resetGame}
          buttonClick={buttonClick}
        />

        {/* Game arena */}
        <GameArena
          p1Cards={p1Cards}
          p2Cards={p2Cards}
          move1={move1}
          move2={move2}
          toggleP1Card={toggleP1Card}
          toggleP2Card={toggleP2Card}
          cardClick={cardClick}
        />

        {/* Game instructions */}
        <Instructions />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
