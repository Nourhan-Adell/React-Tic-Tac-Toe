export default function GameOver({winnerName, onRestart}){
    return(
        <div id="game-over">
            <h2>Game Over</h2>
            {winnerName && <p> {winnerName} won!</p>}
            {!winnerName && <p> It's a draw!</p>}
            <button onClick={onRestart}>Rematch</button>
        </div>
    );
}