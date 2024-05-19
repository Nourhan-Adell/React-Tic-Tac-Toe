import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD  = [
  [null, null,null],
  [null, null,null],
  [null, null,null],
];

const PLAYERS = {X: 'Player 1', O: 'Player 2'};

//Helper function
function derivedActivePlayer(gameTurns){
  let currentActivePlayer = 'X';

      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentActivePlayer = 'O';
      }
      return currentActivePlayer;
}

function deriveWinner(gameBoard, players){
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurn){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurn){
      //Object Distructure
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
  return gameBoard
}



function App() {
  const [gameTurn, setGameturn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  // const [activePlayer, setActivePlayer] = useState();

  //Used to handle the winning states


  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  const activePlayer = derivedActivePlayer(gameTurn);

  function handleActivePlayerSymbol(rowIndex, colIndex){
    // setActivePlayer((currentActivePlayer)=> currentActivePlayer==='X'? 'O':'X');
    setGameturn((prevTurns) =>{
      const activePlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: activePlayer},
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  function handleRestartGame(){
    setGameturn([]);
  }

  //To over write the only changed name
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }

  return (
    <>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol={"X"} isActive={activePlayer === 'X'} onChangeName = {handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol={"O"} isActive={activePlayer === 'O'} onChangeName = {handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winnerName={winner} onRestart = {handleRestartGame}/>}
        <GameBoard onSelectedSquare={handleActivePlayerSymbol} board={gameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
    </>
  )
}

export default App
