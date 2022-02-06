import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ nameIndex, game, setGame}) {
  const updatePlayerNames = (event) => {
    game.names[nameIndex] = event.target.value
    setGame(game.clone());
  }
  
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
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
