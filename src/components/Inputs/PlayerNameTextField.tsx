import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { StatefulGame } from "../../data/classes/StatefulGame";

type PlayerNameTextFieldProps = {
  nameIndex: number;
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const PlayerNameTextField = ({ nameIndex, game, setGame }: PlayerNameTextFieldProps): JSX.Element => {
  const updatePlayerNames = (event: any) => {
    game.names[nameIndex] = event.target.value
    setGame(game.clone());
  }
  
  return (
    <Box
      // sx={{
      //   "& > :not(style)": { m: 1, width: "30ch" },
      // }}
      // noValidate
      // autoComplete="off"
    >
      <TextField 
        id="standard-basic"
        label="Player Name"
        variant="standard" 
        onChange={updatePlayerNames}
      />
    </Box>
  );
}
