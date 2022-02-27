import { SubmitButton } from "../../components/Buttons/Submit";
import { Player } from "../../data/classes/Player";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

const participants = [new Player("Andy"), new Player("Sam"), new Player("Coburn")];

export const WaitingForHost = ({game, setGame}: ViewPropsType): JSX.Element => {

  const returnHome = () => {
    game.setView(game.VIEWS.home);
    setGame(game.clone());
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h1><b>{MESSAGES.guest.waitingForHost.success}</b></h1>

      <hr></hr>

      <h3><b><u>Participants:</u></b></h3>

      {participants.map(participant => {
        return (
          <p key={participant.name}>{participant.name}</p>
        )
      })}

      <SubmitButton
        text={"Return Home"}
        type={"submit"}
        disabled={false} 
        onClick={returnHome}
      />

      <p>Please wait...</p>

      <p>{MESSAGES.guest.waitingForHost.pleaseWait}</p>

    </div>
  );
};