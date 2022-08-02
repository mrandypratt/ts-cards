import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import NSFWToggle from "../../components/Buttons/NSFWToggle";
import { SubmitButton, ReturnHomeButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { containsValidCharacters } from "../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const CreateGame = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ name, setName ] = useState("");

  const updateName = (event: any) => {
    setName(event.target.value);
  }

  const createGame = () => {
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
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Create Game</b></h1>

      <hr></hr>

      <p>{MESSAGES.host.startNewGame}</p>

      <Box>
        <TextField 
          id="enter-name"
          label="Player Name"
          variant="outlined"
          onChange={updateName}
        />
      </Box>

      <NSFWToggle
        game={game}
        setGame={setGame}
      />

      <SubmitButton
        text={"Create Game"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={createGame}
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
