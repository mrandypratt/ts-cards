import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { containsValidCharacters } from "../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const CreateLobby = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ name, setName ] = useState("");

  const updateName = (event: any) => {
    setName(event.target.value);
  }

  const startLobby = () => {
    game.generateLobbyId();
    game.setPlayerName(sessionId, name);
    game.setView(sessionId, VIEWS.host.inviteParticipants);
    socket?.emit(EVENTS.createLobby, game);
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h1><b>Create Lobby</b></h1>

      <hr></hr>

      <p>{MESSAGES.host.createLobby}</p>

      <Box>
        <TextField 
          id="standard-basic"
          label="Player Name"
          variant="outlined"
          helperText="Enter your name here."
          onChange={updateName}
        />
      </Box>

      <SubmitButton
        text={"Create Lobby"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={startLobby}
      />

    </div>
  );
};
