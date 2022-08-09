import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import NSFWToggle from "../../components/Buttons/NSFWToggle";
import { SubmitButton, ReturnHomeButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/EVENTS";
import { containsValidCharacters } from "../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/constants/VIEWS";

export const CreateGame = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ name, setName ] = useState("");
  const [ NSFW, setNSFW ] = useState(false);

  const updateName = (event: any) => {
    setName(event.target.value);
  }

  const createGame = () => {
    socket?.emit(EVENTS.client.createLobby, name, NSFW)
  }

  const returnHome = () => {
    socket?.emit(EVENTS.client.updateView, VIEWS.home);
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
        NSFW={NSFW}
        setNSFW={setNSFW}
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
