import { useState } from "react";
import { ConfirmExitLobbyDialogue } from "../../components/Buttons/ConfirmExitLobbyDialogue";
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const WaitingForHost = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h1><b>Waiting for Host</b></h1>

      <hr></hr>

      <h3 style={{margin: "auto"}}>You joined the lobby!</h3>

      <hr></hr>

      <div>

        <h3><b><u>Players in Lobby:</u></b></h3>

        {game.players.map(participant => {
          return (
            <p key={participant.sessionId}>{participant.name}</p>
            )
          })}

      </div>

      <hr></hr>

      <p>Please wait for the host to begin the game...</p>

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

    </div>
  );
};