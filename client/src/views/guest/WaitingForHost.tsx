import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const WaitingForHost = ({game, setGame, socket}: ViewPropsType): JSX.Element => {

  const returnHome = () => {
    game.setView(game.VIEWS.home);
    setGame(game.clone());
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h1><b>{MESSAGES.guest.waitingForHost.success}</b></h1>

      <hr></hr>

      <h2>Lobby {game.lobbyId}</h2>

      <h3><b><u>Participants:</u></b></h3>

      {game.players.map(participant => {
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