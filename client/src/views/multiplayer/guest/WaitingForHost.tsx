import { Container } from "@mui/material";
import { useState } from "react";
import { ConfirmExitLobbyDialogue } from "../../../components/Buttons/ConfirmExitLobbyDialogue";
import { ExitLobbyButton } from "../../../components/Buttons/Submit";
import { PlayingCard } from "../../../components/Cards/PlayingCard";
import { MESSAGES } from "../../../data/constants/messages";
import { ViewPropsType } from "../../../data/types/ViewPropsType";

export const WaitingForHost = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Game Lobby</b></h1>

      <hr></hr>

      <h3 style={{margin: "auto"}}>Success, you joined the game!</h3>

      <hr></hr>

      <p>Lobby ID: <b>{game?.id}</b></p>

      <PlayingCard
        className="solo-prompt-card"
        type="prompt"
        text="Please wait for the host to begin the game..."
      />

      <hr></hr>

      <div>

        <h3><b><u>Players in Lobby:</u></b></h3>

        {game?.players.map(participant => {
          return (
            <p key={participant.sessionId}>{participant.name}</p>
            )
          })}

      </div>

      <ExitLobbyButton
        text={"Exit Lobby"}
        type={"submit"}
        disabled={false} 
        onClick={showConfirmDeleteDialogue}
      />

      { showDialogue && 
        <ConfirmExitLobbyDialogue
          socket={socket}
          setShowDialogue={setShowDialogue}
          messages={[MESSAGES.dialogue.guestExitLobby1, MESSAGES.dialogue.guestExitLobby2]}
        />
      }

    </Container>
  );
};