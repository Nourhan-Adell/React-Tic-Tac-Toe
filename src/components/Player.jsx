import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChangeName}){
    //You can use useState more than once in the same component if you got different pieces of state you want to manage
    const [playerName, setPlayerName] = useState(initialName);
    const [IsEditing, SetIsEditing] = useState(false);

    function handleEditClick(){
        SetIsEditing((editing)=>!editing); // It's like !IsEditing but by a better practice --> look to video 77 for more illustration

        if(IsEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let EditablePlayerName = <span className="player-name">{playerName}</span>;
    if(IsEditing){
        EditablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    }

    return(
        <li className={isActive? 'active': undefined}>
        <span className="player">
            {EditablePlayerName}
          <span className="player-symbol">{symbol}</span>
          <button onClick={handleEditClick}>{IsEditing? 'Save': 'Edit'}</button>
          </span>
        </li>
    );
}