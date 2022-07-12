import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import NSFWToggle from "../../components/Buttons/NSFWToggle";
import { SubmitButton, ReturnHomeButton } from "../../components/Buttons/Submit";
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

  const returnHome = () => {
    game.setView(sessionId, VIEWS.home);
    socket?.emit(EVENTS.updateView, VIEWS.home);
    setGame(game.clone());
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

      <NSFWToggle
        game={game}
        setGame={setGame}
      />

      <SubmitButton
        text={"Create Lobby"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={startLobby}
      />

      <ReturnHomeButton
        text={"Return Home"}
        type={"submit"}
        disabled={false} 
        onClick={returnHome}
      />

    </div>
  );
};
