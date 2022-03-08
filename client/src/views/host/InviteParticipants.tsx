import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const InviteParticipants = ({game, setGame, socket}: ViewPropsType): JSX.Element => {
  const startGame = () => {
    socket?.emit(EVENTS.startRound, game);
  }

  const minimumPlayersJoined = (): boolean => {
    return game.players.length >= 3;
  }

  return (
    <div style={{ textAlign: "center" }}>

    <h1><b>Invite Friends</b></h1>

    <hr></hr>

    <p>Your Lobby ID is:</p>
    
    <div style={{border: "2px", borderStyle: "solid"}}>

      <h3><b>{game.lobbyId}</b></h3>

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