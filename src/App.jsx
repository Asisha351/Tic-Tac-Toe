import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  const[gameTurns, setGameTurns] = useState([]); //🔴this will declare an array
  //const[activePlayer, setActivePlayer] = useState("X"); //u used better optimised approach

  let currentPlayer='X'; 
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  

  function handlePlayerChange(rowIndex, colIndex){
    setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTurns => {

      let currentPlayer='X'; //🔴we dont use activePlayer as it is not updated immediately in react
      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        currentPlayer = 'O';
      }

      //🔴Use state only for data that changes AND affects UI — everything else should be derived.
      const updatedTurns = [
        //🔴Adds a new move at the start of array, object with properties
        { square : {row: rowIndex, col: colIndex}, player: currentPlayer },
          ...prevTurns,
      ]; //
      return updatedTurns;

    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer==='O'} />
        </ol>
        <GameBoard onSelectSquare={handlePlayerChange} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} /> //🔴we pass gameTurns state as props to another component, we can pass state as prop and it renders the log of moves
    </main>
  )
}

export default App;
