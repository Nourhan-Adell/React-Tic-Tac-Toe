export default function GameBoard({onSelectedSquare, board}){
    //Transfer this Part of code to the App.jsx as it will be used to check the winning states.
    // let gameBoard = initialGameBoard;

    // for(const turn of turns){
    //     //Object Distructure
    //     const {square, player} = turn;
    //     const {row, col} = square;

    //     gameBoard[row][col] = player;
    // }

    // Transfer this code to the App.jsx as a lifting state up, where it will be used in both the gameboard and the Log. 
//     const [gameBoard, setGameBoard] = useState(initialGameBoard);

// function handleSelectedSqueare(rowIndex, colIndex){
//     setGameBoard((prevGameBoard)=>{
//         //Make a new 2D Array
//         //innerArray == Row Array
//         //update the array in immutable way
//         const updatedBoard = [...prevGameBoard.map((innerArray)=>[...innerArray])]
//         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
//         return updatedBoard;
//     });
//     onPlaying();
// }

    return(
        <ol id='game-board'>
            {board.map((row, rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={()=>onSelectedSquare(rowIndex, colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}