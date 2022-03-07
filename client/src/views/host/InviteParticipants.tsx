import { SubmitButton } from "../../components/Buttons/Submit";
import { Game } from "../../data/classes/Game";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const InviteParticipants = ({game, setGame, socket}: ViewPropsType): JSX.Element => {
  const startGame = () => {
    game.setView(socket?.id, VIEWS.home);
    setGame(game.clone());
  }

  socket?.on(EVENTS.joinRoom, (game: string) => {
    setGame(Object.assign(new Game(), JSON.parse(game)));
    console.log("Game State Updated");
  })

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
      console.log(participant);
      return (
        <p key={participant.socketId}>{participant.name}</p>
      )
    })}


    <SubmitButton
      text={"Start Game"}
      type={"submit"}
      disabled={false} 
      onClick={startGame}
    />

    <p>{MESSAGES.host.inviteParticipants.minimumPlayers}</p>


    </div>
  );
};