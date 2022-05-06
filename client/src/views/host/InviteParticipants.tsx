import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const InviteParticipants = ({game, setGame, socket}: ViewPropsType): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const startGame = () => {
    socket?.emit(EVENTS.startRound, game);
  }

  const minimumPlayersJoined = (): boolean => {
    return game.players.length >= 3;
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(game.lobbyId);
    setOpenSnackbar(true)
  }

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

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
        <p key={participant.socketId}>{participant.name}</p>
      )
    })}

    <SubmitButton
      text={"Start Game"}
      type={"submit"}
      disabled={!minimumPlayersJoined()} 
      onClick={startGame}
    />

    { !minimumPlayersJoined() && 
      <p>
        {MESSAGES.host.inviteParticipants.minimumPlayers}
      </p>
    }

    </div>
  );
};