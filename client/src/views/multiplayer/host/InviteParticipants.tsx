import { ExitLobbyButton, SubmitButton } from "../../../components/Buttons/Submit";
import { MESSAGES } from "../../../data/constants/messages";
import { EVENTS } from "../../../data/constants/EVENTS";
import { ViewPropsType } from "../../../data/types/ViewPropsType";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { ConfirmDeleteDialogue } from "../../../components/Buttons/ConfirmDeleteDialogue";
import { Container } from "@mui/material";

export const InviteParticipants = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const startGame = () => {
    socket?.emit(EVENTS.client.multiPlayer.startFirstRound, game);
  }

  const minimumPlayersJoined = (): boolean => {
    const players = game?.players;
    if (players) {
      return game?.players?.length >= 3;
    }
    return false;
  }

  const handleCopyClick = () => {
    let lobbyId = game?.id

    if (lobbyId) {
      navigator.clipboard.writeText(lobbyId);
      setOpenSnackbar(true)
    }
  }

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  const hoverStyle = {
    color: "blue",
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Lobby Created</b></h1>

      <hr></hr>

      <h3 style={{margin: "auto"}}>Invite your Friends!</h3>
      
      <hr></hr>

      <h3 style={{margin: "auto", marginTop: "1rem"}}>Lobby ID:</h3>

      <div style={{border: "2px", borderStyle: "solid", marginTop: ".5rem"}}>

        <h3>
          <b>{game?.id} </b> 

          { process.env.REACT_APP_STAGE === "dev" && <ContentCopyIcon
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleCopyClick}
              style={isHovering ? hoverStyle : {}}
            />

          } 

          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            message="Lobby ID copied to Clipboard!"
          />
        
        </h3>

      </div>

      <p>Share the Lobby ID with your friends so they can join.</p>

      <hr></hr>

      <h3><b><u>Players in Lobby:</u></b></h3>

      {game?.players.map(participant => {
        return (
          <p key={participant.sessionId}>{participant.name}</p>
        )
      })}

      <SubmitButton
        text={"Start Game"}
        type={"submit"}
        disabled={!minimumPlayersJoined()} 
        onClick={startGame}
      />


      { !minimumPlayersJoined() && 
        <p>At least 3 players are required to start a game.</p>
      }

      <ExitLobbyButton
        text={"Leave Game"}
        type={"submit"}
        disabled={false} 
        onClick={showConfirmDeleteDialogue}
      />

      { showDialogue && 
        <ConfirmDeleteDialogue
          socket={socket}
          setShowDialogue={setShowDialogue}
          messages={[MESSAGES.dialogue.hostAbandonLobby1, MESSAGES.dialogue.hostAbandonLobby2]}
        />
      }
    </Container>

  );
};