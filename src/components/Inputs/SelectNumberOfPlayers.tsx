import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { StatefulGame } from '../../data/classes/StatefulGame';

const numberOfPlayerOptions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type SelectNumberOfPlayersProps = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const SelectNumberOfPlayers = ({ game, setGame }: SelectNumberOfPlayersProps) => {
  
  const updateNumberOfPlayers = (event: any) => {
    let originalLength = game.names.length;
    let newLength = event.target.value;
    game.names.length = newLength;
    game.names.fill("", originalLength);    
    setGame(game.clone());
  };

  return (
    <TextField
      id="select-number-of-players"
      select
      label="Select"
      value={game.names.length}
      onChange={updateNumberOfPlayers}
      helperText="Please select the number of players"
    >
      {numberOfPlayerOptions.map((num) => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </TextField>
  );
}