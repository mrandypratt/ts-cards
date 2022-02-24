import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const CreateLobby = ({game, setGame}: ViewPropsType): JSX.Element => {
  return (
    <div style={{ textAlign: "center" }}>

    <h1><b>New Game</b></h1>

    <hr></hr>

      <p>{MESSAGES.host.createLobby}</p>

      <Box>
        <TextField 
          id="standard-basic"
          label="Player Name"
          variant="outlined"
          helperText="Enter your name here."
        />
      </Box>

      <SubmitButton
        text={"Create Lobby"}
        type={"submit"}
        disabled={true} 
      />

    </div>
  );
};
