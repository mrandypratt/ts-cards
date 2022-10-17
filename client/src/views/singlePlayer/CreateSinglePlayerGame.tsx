import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import NSFWToggle from "../../components/Buttons/NSFWToggle";
import { SubmitButton, ReturnHomeButton } from "../../components/Buttons/Submit";
import { EVENTS } from "../../data/constants/EVENTS";
import { containsValidCharacters } from "../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/constants/VIEWS";

export const CreateSinglePlayerGame = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ name, setName ] = useState("");
  const [ NSFW, setNSFW ] = useState(false);

  const updateName = (event: any) => {
    setName(event.target.value);
  }

  const findGame = () => {
    socket?.emit(EVENTS.client.createSinglePlayerGame, name, NSFW)
  }

  const returnHome = () => {
    socket?.emit(EVENTS.client.updateView, VIEWS.home);
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Play Online</b></h1>

      <hr></hr>

      <p>Before we get the party started, tell us who you are and how crazy you want to get!</p>

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
        text={"Find Game"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={findGame}
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
