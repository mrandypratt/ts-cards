import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const WaitingForHost = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {

  const exitLobby = () => {
    socket?.emit(EVENTS.exitLobby, game);
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h1><b>Success!</b></h1>

      <hr></hr>

      <h2>You joined Lobby {game.lobbyId}</h2>

      <h3><b><u>Other Participants:</u></b></h3>

      {game.players.map(participant => {
        return (
          <p key={participant.sessionId}>{participant.name}</p>
        )
      })}

      <hr></hr>

      <p>Please wait...</p>

      <p>{MESSAGES.guest.waitingForHost.pleaseWait}</p>

      <ExitLobbyButton
        text={"Exit Lobby"}
        type={"submit"}
        disabled={false} 
        onClick={exitLobby}
      />

    </div>
  );
};