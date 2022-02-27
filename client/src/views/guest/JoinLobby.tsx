import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { containsValidCharacters } from "../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const JoinLobby = ({game, setGame, socket}: ViewPropsType): JSX.Element => {
  const [ room, setRoom ] = useState("");
  const [ name, setName ] = useState("");

  const updateRoom = (event: any) => {
    setRoom(event.target.value);
  }

  const updateName = (event: any) => {
    setName(event.target.value);
  }
  
  const joinLobby = () => {
    game.addPlayer(name, socket?.id)
    socket?.emit(EVENTS.joinRoom, room);
    game.setView(game.VIEWS.guest.waitingForHost);
    socket?.emit(EVENTS.updateGameState, game);
    setGame(game.clone());
  }

  return (
    <div style={{ textAlign: "center" }}>

    <h1><b>Join a Lobby</b></h1>

    <hr></hr>

      <p>{MESSAGES.guest.joinLobby}</p>

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
        text={"Join Lobby"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={joinLobby}
      />

    </div>
  );
};
