import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export const InviteParticipants = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const startGame = () => {
    socket?.emit(EVENTS.startRound, game);
  }

  const minimumPlayersJoined = (): boolean => {
    return game.players.length >= 3;
  }

  const handleCopyClick = () => {
    let lobbyId = game.lobbyId
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

  const deleteLobby = () => {
    socket?.emit(EVENTS.deleteLobby, game)
  }

  const hoverStyle = {
    color: "blue",
  }

  return (
    <div style={{ textAlign: "center" }}>

    <h1><b>Invite Friends</b></h1>

    <hr></hr>

    <p>Your Lobby ID is:</p>
    
    <div style={{border: "2px", borderStyle: "solid"}}>

      <h3>
        <b>{game.lobbyId} </b> 

        <ContentCopyIcon
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleCopyClick}
          style={isHovering ? hoverStyle : {}}
        />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Lobby ID copied to Clipboard!"
        />
      
      </h3>

    </div>

    <p>{MESSAGES.host.inviteParticipants.shareLobbyID}</p>

    <h3><b><u>Participants:</u></b></h3>

    {game.players.map(participant => {
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

    <ExitLobbyButton
      text={"Delete Lobby"}
      type={"submit"}
      disabled={false} 
      onClick={deleteLobby}
    />

    { !minimumPlayersJoined() && 
      <p>
        {MESSAGES.host.inviteParticipants.minimumPlayers}
      </p>
    }

    </div>
  );
};