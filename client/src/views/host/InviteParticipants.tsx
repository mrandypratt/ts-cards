import { SubmitButton } from "../../components/Buttons/Submit";
import { Player } from "../../data/classes/Player";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

const participants = [new Player("Andy"), new Player("Sam"), new Player("Coburn")];

export const InviteParticipants = ({game, setGame}: ViewPropsType): JSX.Element => {
  const startGame = () => {
    game.setView(game.VIEWS.home);
    setGame(game.clone());
  }

  return (
    <div style={{ textAlign: "center" }}>

    <h1><b>Invite Friends</b></h1>

    <hr></hr>

    <p>Your Lobby ID is:</p>
    
    <div style={{border: "2px", borderStyle: "solid"}}>

      <h3><b>CODE</b></h3>

    </div>

    <p>{MESSAGES.host.inviteParticipants.shareLobbyID}</p>

    <h3><b><u>Participants:</u></b></h3>

    {participants.map(participant => {
      return (
        <p key={participant.name}>{participant.name}</p>
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