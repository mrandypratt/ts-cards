import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SubmitButton, ReturnHomeButton } from "../../components/Buttons/Submit";
import { EVENTS } from "../../data/constants/socketEvents";
import { containsValidCharacters } from "../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const JoinLobby = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [ room, setRoom ] = useState("");
  const [ name, setName ] = useState("");

  const updateRoom = (event: any) => {
    setRoom(event.target.value);
  }

  const updateName = (event: any) => {
    setName(event.target.value);
  }
  
  const joinLobby = () => {
    game.setPlayerName(sessionId, name);
    game.setLobby(room);
    game.setView(sessionId, VIEWS.guest.waitingForHost);
    socket?.emit(EVENTS.joinLobby, game, game.getPlayer(sessionId));
  }

  const returnHome = () => {
    game.setView(sessionId, VIEWS.home);
    socket?.emit(EVENTS.updateView, VIEWS.home);
    setGame(game.clone());
  }

  return (
    <Container className="page-container" maxWidth="sm">   

    <h1><b>Join a Game</b></h1>

    <hr></hr>

      <p>Enter the <b>Lobby ID</b> provided by the game host.</p>

      <Box style={{marginBottom: 10}}>
        <TextField 
          id="standard-basic"
          label="Lobby ID"
          variant="outlined"
          helperText="Enter Lobby ID"
          onChange={updateRoom}
        />
      </Box>

      <Box>
        <TextField 
          id="standard-basic"
          label="Name"
          variant="outlined"
          helperText="Enter your name"
          onChange={updateName}
        />
      </Box>

      <SubmitButton
        text={"Join Game"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={joinLobby}
      />

      <ReturnHomeButton
        text={"Return Home"}
        type={"submit"}
        disabled={false} 
        onClick={returnHome}
      />

    </Container>
  );
};
