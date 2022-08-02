import { Container } from "@mui/material";
import { useState } from "react";
import { ConfirmExitLobbyDialogue } from "../../components/Buttons/ConfirmExitLobbyDialogue";
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const WaitingForHost = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Waiting for Host</b></h1>

      <hr></hr>

      <h3 style={{margin: "auto"}}>You joined the lobby!</h3>

      <hr></hr>

      <PromptCard
        text="Please wait for the host to begin the game..."
        className="solo-prompt-card"
      />

      <hr></hr>

      <div>

        <h3><b><u>Players in Lobby:</u></b></h3>

        {game.players.map(participant => {
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
          game={game}
          socket={socket}
          setShowDialogue={setShowDialogue}
          messages={[MESSAGES.dialogue.guestExitLobby1, MESSAGES.dialogue.guestExitLobby2]}
        />
      }

    </Container>
  );
};